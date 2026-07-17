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

- Always answer in Markdown.
- Use headings when appropriate.
- Use bullet points.
- Explain concepts in simple English.
- Include code examples whenever useful.
- End every answer with a small tip.

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
          await supabaseAdmin.from("chat_messages").insert([
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