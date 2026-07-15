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
      model: "gemini-2.5-flash-lite",
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
              text: `Generate 10 multiple choice questions from this PDF.

Format:

Q1.
A.
B.
C.
D.
Answer:

Only return the quiz.`,
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

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}