"use server";

import { createClient } from "../supabase";
import { revalidatePath } from "next/cache";

export interface Like {
  id: string;
  user_id: string;
  liked_user_id: string;
  created_at: string;
  liked_user?: {
    id: string;
    name: string;
    age: number;
    bio: string;
    image_url: string;
    location?: string;
  };
}

export async function getLikesReceived(): Promise<Like[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: likes, error } = await supabase
    .from("likes")
    .select(
      `
      *,
      liked_user:users!user_id(
        id,
        name,
        age,
        bio,
        image_url,
        location
      )
    `
    )
    .eq("liked_user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch likes received");
  }

  return likes || [];
}

export async function getLikesSent(): Promise<Like[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: likes, error } = await supabase
    .from("likes")
    .select(
      `
      *,
      liked_user:users!liked_user_id(
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
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch likes sent");
  }

  return likes || [];
}

export async function unlikeUser(userId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  await supabase
    .from("likes")
    .delete()
    .eq("user_id", user.id)
    .eq("liked_user_id", userId);

  revalidatePath("/liked");
  revalidatePath("/browse");
}

export async function getFavorites(): Promise<Like[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: favorites, error } = await supabase
    .from("favorites")
    .select(
      `
      *,
      favorited_user:users!favorited_user_id(
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
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch favorites");
  }

  return favorites || [];
}

export async function addFavorite(userId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  await supabase.from("favorites").insert({
    user_id: user.id,
    favorited_user_id: userId,
  });

  revalidatePath("/favorites");
}

export async function removeFavorite(userId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("favorited_user_id", userId);

  revalidatePath("/favorites");
}
