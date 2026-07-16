import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabase-admin";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { fileName } = await req.json();

    if (!fileName) {
      return Response.json(
        {
          success: false,
          error: "File name is required.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.storage
      .from("uploads")
      .download(fileName);

    if (error || !data) {
      throw new Error("Unable to download PDF.");
    }

    const buffer = Buffer.from(await data.arrayBuffer());

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "application/pdf",
                data: buffer.toString("base64"),
              },
            },
            {
              text: `
Generate exactly 10 multiple choice questions.

Return the output in Markdown format.

Example:

## Question 1
What is Python?

A. Language A
B. Language B
C. Language C
D. Language D

**Answer:** B

---

## Question 2
...

Do not return JSON.
Do not return HTML.
Only Markdown.
`,
            },
          ],
        },
      ],
    });

    return Response.json({
      success: true,
      quiz: response.text,
    });

  } catch (error: any) {
    console.error("QUIZ ERROR:", error);

    const message =
      error?.status === 429
        ? "AI service is currently busy. Please try again in a few minutes."
        : error?.message || "Failed to generate quiz.";

    return Response.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}