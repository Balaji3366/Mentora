import { readFile } from "fs/promises";
import { join } from "path";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { fileName } = await req.json();

    if (!fileName) {
      return Response.json(
        {
          success: false,
          error: "File name is required",
        },
        {
          status: 400,
        }
      );
    }

    const filePath = join(
      process.cwd(),
      "public",
      "uploads",
      fileName
    );

    const fileBuffer = await readFile(filePath);

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "application/pdf",
                data: fileBuffer.toString("base64"),
              },
            },
            {
              text: "Summarize this PDF into simple bullet points.",
            },
          ],
        },
      ],
    });

    return Response.json({
      success: true,
      summary: response.text,
    });
  } catch (error: any) {
    console.error("SUMMARY ERROR:", error);

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