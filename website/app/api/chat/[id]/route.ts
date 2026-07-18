import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from("chat_messages")
      .select("*")
      .eq("session_id", id)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return Response.json(data);
  } catch (err) {
    console.error(err);

    return new Response("Failed to load chat.", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete messages first
    const { error: messagesError } = await supabaseAdmin
      .from("chat_messages")
      .delete()
      .eq("session_id", id);

    if (messagesError) throw messagesError;

    // Delete session
    const { error: sessionError } = await supabaseAdmin
      .from("chat_sessions")
      .delete()
      .eq("id", id);

    if (sessionError) throw sessionError;

    return Response.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return new Response("Failed to delete chat.", {
      status: 500,
    });
  }
}