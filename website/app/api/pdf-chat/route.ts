import { readFile } from "fs/promises";
import { join } from "path";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

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

    const filePath = join(
      process.cwd(),
      "public",
      "uploads",
      fileName
    );

    const buffer = await readFile(filePath);

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