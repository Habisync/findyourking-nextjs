"use client";

import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../actions/profile";
import { UserProfile } from "../actions/profile";

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile(userId);
      setProfile(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data: Partial<UserProfile>) => {
    try {
      setUpdating(true);
      const updated = await updateProfile(data);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return {
    profile,
    loading,
    updating,
    error,
    update,
    refresh: loadProfile,
  };
}
