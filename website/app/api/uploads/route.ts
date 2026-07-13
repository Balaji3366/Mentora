import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    // Get FormData
    const formData = await req.formData();

    // Get uploaded file
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json(
        {
          success: false,
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload directory
    const uploadDir = join(process.cwd(), "public", "uploads");

    // Create uploads folder if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    // Full file path
    const uploadPath = join(uploadDir, file.name);

    // Save file
    await writeFile(uploadPath, buffer);

    return Response.json({
      success: true,
      filename: file.name,
      path: `/uploads/${file.name}`,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown upload error",
      },
      {
        status: 500,
      }
    );
  }
}