"use client";

import { useState, useEffect } from "react";
import { getMatches, getPotentialMatches, likeUser, passUser } from "../actions/matches";
import { Match } from "../types/match";

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [potentialMatches, setPotentialMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const [matchesData, potentialData] = await Promise.all([
        getMatches(),
        getPotentialMatches(),
      ]);
      setMatches(matchesData);
      setPotentialMatches(potentialData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (userId: string) => {
    try {
      const result = await likeUser(userId);
      if (result.match) {
        await loadMatches();
      }
      setPotentialMatches((prev) => prev.filter((u) => u.id !== userId));
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const handlePass = async (userId: string) => {
    try {
      await passUser(userId);
      setPotentialMatches((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    matches,
    potentialMatches,
    loading,
    error,
    handleLike,
    handlePass,
    refresh: loadMatches,
  };
}
