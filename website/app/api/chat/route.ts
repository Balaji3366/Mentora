import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await ai.models.generateContent({
      model: "models/gemini-3-flash-preview",
      contents: message,
    });

    return Response.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return Response.json(
      {
        reply: "❌ Something went wrong.",
      },
      { status: 500 }
    );
  }
}