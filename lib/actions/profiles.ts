"use server";
import { createClient } from "../supabase/server";

export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  email: string;
  gender: string;
  birthdate: string;
  bio: string;
  avatar_url: string;
  preferences: any;
  location_lat?: number;
  location_lng?: number;
  last_active: string;
  is_verified: boolean;
  is_online: boolean;
  created_at: string;
  updated_at: string;
  distance?: number;
}

export async function discoverProfiles(params?: {
  limit?: number;
  offset?: number;
  ageMin?: number;
  ageMax?: number;
  genderPreference?: string[];
}): Promise<UserProfile[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  let query = supabase
    .from("users")
    .select("*")
    .neq("id", user.id)
    .order("created_at", { ascending: false });

  if (params?.limit) {
    query = query.limit(params.limit);
  } else {
    query = query.limit(50);
  }

  if (params?.offset) {
    query = query.range(params.offset, params.offset + (params.limit || 50));
  }

  const { data: profiles, error } = await query;

  if (error) {
    throw new Error("Failed to fetch profiles");
  }

  return (
    profiles?.map((profile) => ({
      id: profile.id,
      full_name: profile.full_name,
      username: profile.username,
      email: profile.email,
      gender: profile.gender,
      birthdate: profile.birthdate,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      preferences: profile.preferences,
      location_lat: profile.location_lat,
      location_lng: profile.location_lng,
      last_active: profile.last_active || new Date().toISOString(),
      is_verified: profile.is_verified || false,
      is_online: profile.is_online || false,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    })) || []
  );
}

export async function getNearbyProfiles(params: {
  latitude: number;
  longitude: number;
  radiusKm?: number;
  limit?: number;
}): Promise<UserProfile[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const radiusKm = params.radiusKm || 25;
  const limit = params.limit || 50;

  // Using PostGIS functions for geospatial queries
  const { data: profiles, error } = await supabase.rpc("nearby_users", {
    user_lat: params.latitude,
    user_lng: params.longitude,
    radius_km: radiusKm,
    result_limit: limit,
  });

  if (error) {
    console.error("Nearby profiles error:", error);
    // Fallback to all profiles if geospatial query fails
    return discoverProfiles({ limit });
  }

  return (
    profiles?.map((profile: any) => ({
      id: profile.id,
      full_name: profile.full_name,
      username: profile.username,
      email: profile.email,
      gender: profile.gender,
      birthdate: profile.birthdate,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      preferences: profile.preferences,
      location_lat: profile.location_lat,
      location_lng: profile.location_lng,
      last_active: profile.last_active || new Date().toISOString(),
      is_verified: profile.is_verified || false,
      is_online: profile.is_online || false,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      distance: profile.distance,
    })) || []
  );
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    return null;
  }

  return {
    id: profile.id,
    full_name: profile.full_name,
    username: profile.username,
    email: profile.email,
    gender: profile.gender,
    birthdate: profile.birthdate,
    bio: profile.bio,
    avatar_url: profile.avatar_url,
    preferences: profile.preferences,
    location_lat: profile.location_lat,
    location_lng: profile.location_lng,
    last_active: profile.last_active || new Date().toISOString(),
    is_verified: profile.is_verified || false,
    is_online: profile.is_online || false,
    created_at: profile.created_at,
    updated_at: profile.updated_at,
  };
}

export async function updateProfile(data: Partial<UserProfile>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { error } = await supabase
    .from("users")
    .update({
      full_name: data.full_name,
      username: data.username,
      gender: data.gender,
      birthdate: data.birthdate,
      bio: data.bio,
      avatar_url: data.avatar_url,
      preferences: data.preferences,
      location_lat: data.location_lat,
      location_lng: data.location_lng,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    throw new Error("Failed to update profile");
  }

  return { success: true };
}

export async function searchProfiles(searchTerm: string): Promise<UserProfile[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: profiles, error } = await supabase
    .from("users")
    .select("*")
    .neq("id", user.id)
    .or(`username.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`)
    .limit(20);

  if (error) {
    throw new Error("Failed to search profiles");
  }

  return (
    profiles?.map((profile) => ({
      id: profile.id,
      full_name: profile.full_name,
      username: profile.username,
      email: profile.email,
      gender: profile.gender,
      birthdate: profile.birthdate,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      preferences: profile.preferences,
      location_lat: profile.location_lat,
      location_lng: profile.location_lng,
      last_active: profile.last_active || new Date().toISOString(),
      is_verified: profile.is_verified || false,
      is_online: profile.is_online || false,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    })) || []
  );
}
