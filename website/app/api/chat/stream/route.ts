import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabase-admin";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      message,
      history = [],
      sessionId,
    } = await req.json();

    let currentSessionId = sessionId;

    // Create session if needed
    if (!currentSessionId) {
      const { data, error } = await supabaseAdmin
        .from("chat_sessions")
        .insert({
          title: message.slice(0, 40),
        })
        .select("id")
        .single();

      if (error) throw error;

      currentSessionId = data.id;
    }

    const prompt = `
You are Mentora AI, an intelligent, friendly and professional AI mentor.

Your job is to help students, developers and job seekers learn better.

Follow these rules:

Follow these rules STRICTLY.

Your output MUST always be valid GitHub Markdown.

Rules:

- Start every answer with a level-2 heading (##).
- Use level-3 headings (###) for sections.
- Every list MUST use "-" bullets.
- Bold important words using **bold**.
- Every code example MUST be inside triple backticks with the language name.
- Leave one blank line between headings, paragraphs and lists.
- Never write headings or lists as plain text.
- Return Markdown only.
- End every answer with:

## 💡 Tip

followed by one useful tip.

Conversation History:

${history
  .slice(-10)
  .map(
    (msg: { sender: string; text: string }) =>
      `${msg.sender}: ${msg.text}`
  )
  .join("\n")}

User Question:

${message}
`;

    const stream = await ai.models.generateContentStream({
      model: "models/gemini-3-flash-preview",
      contents: prompt,
    });

    const encoder = new TextEncoder();
    let fullResponse = "";

    const readable = new ReadableStream({
      async start(controller) {
        // Send session id first
        controller.enqueue(
          encoder.encode(
            `event: session\ndata: ${JSON.stringify({
              sessionId: currentSessionId,
            })}\n\n`
          )
        );

        try {
          for await (const chunk of stream) {
            const text = chunk.text ?? "";
            console.log("CHUNK:", JSON.stringify(text));
            if (!text) continue;

            fullResponse += text;

            controller.enqueue(
              encoder.encode(
                `event: chunk\ndata: ${JSON.stringify({
                  text,
                })}\n\n`
              )
            );
          }

          // Save messages after streaming completes
          const { error } = await supabaseAdmin
            .from("chat_messages")
            .insert([
                {
                session_id: currentSessionId,
                sender: "You",
                message,
                },
                {
                session_id: currentSessionId,
                sender: "AI",
                message: fullResponse,
                },
            ]);

            if (error) {
            console.error("Failed to save messages:", error);
            }

          controller.enqueue(
            encoder.encode(
              `event: done\ndata: {}\n\n`
            )
          );

          controller.close();
        } catch (err) {
          console.error(err);

          controller.enqueue(
            encoder.encode(
              `event: error\ndata: ${JSON.stringify({
                message: "Streaming failed",
              })}\n\n`
            )
          );

          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error(err);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}