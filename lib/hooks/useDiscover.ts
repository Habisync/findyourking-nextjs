"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface DiscoverFilters {
  minAge?: number;
  maxAge?: number;
  maxDistance?: number; // in kilometers
  tags?: string[];
  isOnline?: boolean;
  hasPhoto?: boolean;
}

export interface UserProfile {
  id: string;
  username: string;
  age: number;
  profileImage: string;
  distance: number;
  isOnline: boolean;
  bio?: string;
  location?: string;
}

export function useDiscover(filters: DiscoverFilters = {}) {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const supabase = createClient();
  const ITEMS_PER_PAGE = 20;

  const fetchUsers = async (pageNum: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Get current user's location
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: currentUser } = await supabase
        .from('profiles')
        .select('location')
        .eq('id', user.id)
        .single();

      if (!currentUser?.location) {
        throw new Error('User location not set');
      }

      // Build query
      let query = supabase
        .from('profiles')
        .select('id, username, age, profile_image, bio, location, is_online, last_seen')
        .neq('id', user.id);

      // Apply filters
      if (filters.minAge) {
        query = query.gte('age', filters.minAge);
      }
      if (filters.maxAge) {
        query = query.lte('age', filters.maxAge);
      }
      if (filters.isOnline) {
        query = query.eq('is_online', true);
      }
      if (filters.hasPhoto) {
        query = query.not('profile_image', 'is', null);
      }

      // Pagination
      const from = (pageNum - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      query = query.range(from, to);

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Calculate distances (mock - replace with PostGIS function)
      const usersWithDistance = (data || []).map(user => ({
        id: user.id,
        username: user.username,
        age: user.age,
        profileImage: user.profile_image || '/default-avatar.png',
        distance: Math.random() * 10, // Mock distance - replace with actual calculation
        isOnline: user.is_online || false,
        bio: user.bio,
        location: user.location
      }));

      // Filter by distance if specified
      let filteredUsers = usersWithDistance;
      if (filters.maxDistance) {
        filteredUsers = usersWithDistance.filter(
          u => u.distance <= filters.maxDistance!
        );
      }

      if (pageNum === 1) {
        setUsers(filteredUsers);
      } else {
        setUsers(prev => [...prev, ...filteredUsers]);
      }

      setHasMore(data?.length === ITEMS_PER_PAGE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      console.error('Discover error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, [JSON.stringify(filters)]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchUsers(nextPage);
    }
  };

  const refresh = () => {
    setPage(1);
    fetchUsers(1);
  };

  return {
    users,
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  };
}
