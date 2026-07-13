import { readdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const folderPath = join(process.cwd(), "public", "uploads");

    const files = await readdir(folderPath);

    return Response.json(files);
  } catch (error) {
    console.error(error);

    return Response.json([], {
      status: 500,
    });
  }
}