import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase.storage
    .from("uploads")
    .list("", {
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  if (error) {
    return Response.json([]);
  }

  return Response.json(
    data.map((f) => f.name)
  );
}