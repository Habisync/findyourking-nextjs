"use server";

import { createClient } from "../supabase";
import { revalidatePath } from "next/cache";

export interface Match {
  id: string;
  user_id: string;
  matched_user_id: string;
  created_at: string;
  status: "pending" | "accepted" | "rejected";
  matched_user?: {
    id: string;
    name: string;
    age: number;
    bio: string;
    image_url: string;
    location?: string;
  };
}

export async function getPotentialMatches(): Promise<Match[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: potentialMatches, error } = await supabase
    .from("users")
    .select("*")
    .neq("id", user.id)
    .limit(50);

  if (error) {
    throw new Error("Failed to fetch potential matches");
  }

  return potentialMatches || [];
}

export async function getMatches(): Promise<Match[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: matches, error } = await supabase
    .from("matches")
    .select(
      `
      *,
      matched_user:users!matched_user_id(
        id,
        name,
        age,
        bio,
        image_url,
        location
      )
    `
    )
    .eq("user_id", user.id)
    .eq("status", "accepted")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch matches");
  }

  return matches || [];
}

export async function likeUser(userId: string): Promise<{ match: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  // Check if the other user already liked this user
  const { data: existingLike } = await supabase
    .from("likes")
    .select("*")
    .eq("user_id", userId)
    .eq("liked_user_id", user.id)
    .single();

  // Create the like
  await supabase.from("likes").insert({
    user_id: user.id,
    liked_user_id: userId,
  });

  // If there's a mutual like, create a match
  if (existingLike) {
    await supabase.from("matches").insert([
      {
        user_id: user.id,
        matched_user_id: userId,
        status: "accepted",
      },
      {
        user_id: userId,
        matched_user_id: user.id,
        status: "accepted",
      },
    ]);

    revalidatePath("/matches");
    return { match: true };
  }

  revalidatePath("/browse");
  return { match: false };
}

export async function passUser(userId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  await supabase.from("passes").insert({
    user_id: user.id,
    passed_user_id: userId,
  });

  revalidatePath("/browse");
}

export async function unmatchUser(matchId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  await supabase.from("matches").delete().eq("id", matchId).eq("user_id", user.id);

  revalidatePath("/matches");
}
