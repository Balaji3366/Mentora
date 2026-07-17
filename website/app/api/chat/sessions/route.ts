import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("chat_sessions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json([], { status: 500 });
  }
}