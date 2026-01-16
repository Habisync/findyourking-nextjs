"use server";

import { createClient } from "../supabase";
import { revalidatePath } from "next/cache";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  bio: string;
  image_url: string;
  location?: string;
  gender?: string;
  interests?: string[];
  looking_for?: string;
  height?: number;
  ethnicity?: string;
  body_type?: string;
  relationship_status?: string;
  created_at: string;
  updated_at: string;
}

export async function getProfile(userId?: string): Promise<UserProfile | null> {
  const supabase = await createClient();
  
  if (!userId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("Not authenticated.");
    }
    userId = user.id;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }

  return profile;
}

export async function updateProfile(
  profileData: Partial<UserProfile>
): Promise<UserProfile> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: profile, error } = await supabase
    .from("users")
    .update({
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error("Failed to update profile");
  }

  revalidatePath("/profile");
  revalidatePath("/settings");

  return profile;
}

export async function uploadProfileImage(
  file: File
): Promise<{ url: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `profile-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (uploadError) {
    throw new Error("Failed to upload image");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  // Update user profile with new image URL
  await updateProfile({ image_url: publicUrl });

  return { url: publicUrl };
}

export async function deleteAccount(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  // Delete user data from database
  await supabase.from("users").delete().eq("id", user.id);

  // Delete authentication account
  await supabase.auth.admin.deleteUser(user.id);
}

export async function blockUser(blockedUserId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  await supabase.from("blocked_users").insert({
    user_id: user.id,
    blocked_user_id: blockedUserId,
  });

  revalidatePath("/browse");
  revalidatePath("/matches");
}

export async function reportUser(
  reportedUserId: string,
  reason: string
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  await supabase.from("reports").insert({
    reporter_id: user.id,
    reported_user_id: reportedUserId,
    reason,
  });
}
