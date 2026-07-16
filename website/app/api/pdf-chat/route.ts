import { readFile } from "fs/promises";
import { join } from "path";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
export async function POST(req: Request) {
  try {
    const { fileName, question } = await req.json();

    if (!fileName || !question) {
      return Response.json(
        {
          success: false,
          error: "File name and question are required.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.storage
      .from("uploads")
      .download(fileName);

    if (error || !data) {
      throw new Error("Failed to download PDF from Storage.");
    }

    const buffer = Buffer.from(await data.arrayBuffer());

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: buffer.toString("base64"),
          },
        },
        {
          text: `Answer this question only using the uploaded PDF.

Question:
${question}`,
        },
      ],
    });

    return Response.json({
      success: true,
      answer: response.text,
    });

  } catch (error: any) {
    console.error(error);

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