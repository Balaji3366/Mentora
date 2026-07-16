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
              text: "Summarize this PDF into simple bullet points.",
            },
          ],
        },
      ],
    });
    console.log("FULL RESPONSE:");
console.dir(response, { depth: null });

console.log("TEXT:", response.text);
console.log("CANDIDATES:", response.candidates);

    const summary =
  response.candidates?.[0]?.content?.parts?.[0]?.text || "";

return Response.json({
  success: true,
  summary,
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