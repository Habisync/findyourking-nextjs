import { createClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("matches")
    .select(`
      *,
      matched_user:users!matched_user_id(
        id,
        name,
        age,
        bio,
        image_url,
        location
      )
    `)
    .eq("user_id", user.id)
    .eq("status", "accepted");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { action, targetUserId } = body;

  if (action === "like") {
    const { data: existingLike } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", targetUserId)
      .eq("liked_user_id", user.id)
      .single();

    await supabase.from("likes").insert({
      user_id: user.id,
      liked_user_id: targetUserId,
    });

    if (existingLike) {
      await supabase.from("matches").insert([
        {
          user_id: user.id,
          matched_user_id: targetUserId,
          status: "accepted",
        },
        {
          user_id: targetUserId,
          matched_user_id: user.id,
          status: "accepted",
        },
      ]);

      return NextResponse.json({ match: true }, { status: 200 });
    }

    return NextResponse.json({ match: false }, { status: 200 });
  }

  if (action === "pass") {
    await supabase.from("passes").insert({
      user_id: user.id,
      passed_user_id: targetUserId,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
