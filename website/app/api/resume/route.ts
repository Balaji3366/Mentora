import { GoogleGenAI } from "@google/genai";
import { extractText, getDocumentProxy } from "unpdf";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("resume") as File | null;

    if (!file) {
      return Response.json(
        {
          success: false,
          error: "No resume uploaded.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const pdf = await getDocumentProxy(new Uint8Array(bytes));

    const { text: resumeText } = await extractText(pdf, {
      mergePages: true,
    });

    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Resume:

${resumeText}

Return ONLY in this format.

ATS_SCORE:
<number>/100

STRENGTHS:
- Point 1
- Point 2
- Point 3
- Point 4

WEAKNESSES:
- Point 1
- Point 2
- Point 3
- Point 4

SUGGESTIONS:
- Point 1
- Point 2
- Point 3
- Point 4

Rules:
- Don't use markdown.
- Keep every point under 20 words.
- Give a realistic ATS score.
`;
const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    return Response.json({
      success: true,
      message: response.text,
    });

  } catch (error: any) {
    console.error("Resume Analyzer Error:", error);

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