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

    // Download PDF from Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from("uploads")
      .download(fileName);

    if (error || !data) {
      throw new Error("Unable to download PDF.");
    }

    const buffer = Buffer.from(await data.arrayBuffer());

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
                    data: buffer.toString("base64"),
                  },
                },
                {
                  text: `
Generate 10 interview questions from this PDF.

Requirements:
- Divide into three sections:
  1. HR Questions
  2. Technical Questions
  3. Scenario Based Questions
- Mention difficulty (Easy / Medium / Hard).
- Keep questions professional.
- Return only the interview questions.
`,
                },
              ],
            },
          ],
        });

        break;
      } catch (err: any) {
        if (i === 2) throw err;

        // Wait 3 seconds and retry
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    return Response.json({
      success: true,
      interview: response?.text,
    });

  } catch (error: any) {
    console.error("INTERVIEW ERROR:", error);

    const message =
      error?.status === 429
        ? "AI service is busy right now. Please try again in a minute."
        : error?.message || "Failed to generate interview questions.";

    return Response.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}