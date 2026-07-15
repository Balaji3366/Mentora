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
      } catch (err) {
        if (i === 2) throw err;
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    return Response.json({
      success: true,
      interview: response?.text,
    });
  } catch (error: any) {
    console.error("INTERVIEW ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}