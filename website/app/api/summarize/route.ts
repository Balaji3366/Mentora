import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

    // Download PDF from Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from("uploads")
      .download(fileName);

    if (error || !data) {
      return Response.json(
        {
          success: false,
          error: "Unable to download PDF from Storage.",
        },
        {
          status: 500,
        }
      );
    }

    const buffer = Buffer.from(await data.arrayBuffer());

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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
        error: error.message || "Failed to summarize PDF.",
      },
      {
        status: 500,
      }
    );
  }
}