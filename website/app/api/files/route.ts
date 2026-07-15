import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.storage
      .from("uploads")
      .list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      throw error;
    }

    const files = data.map((file) => file.name);

    return Response.json(files);
  } catch (error) {
    console.error("FILES ERROR:", error);

    return Response.json([], {
      status: 500,
    });
  }
}