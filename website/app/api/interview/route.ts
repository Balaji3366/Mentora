import { readFile } from "fs/promises";
import { join } from "path";
import { GoogleGenAI } from "@google/genai";

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

    const filePath = join(
      process.cwd(),
      "public",
      "uploads",
      fileName
    );

    const fileBuffer = await readFile(filePath);

    let response;

for (let i = 0; i < 3; i++) {
  try {
    response = await ai.models.generateContent({
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
              text: `
Generate 10 interview questions from this PDF.

Include:
- HR Questions
- Technical Questions
- Scenario Based Questions

Only return the interview questions.
`,
            },
          ],
        },
      ],
    });

    break;
  } catch (err: any) {
    if (i === 2) throw err;

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

    return Response.json({
      success: true,
      interview: response?.text,
    });

  } catch (error: any) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}