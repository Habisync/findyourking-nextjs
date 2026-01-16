import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Typed helpers
export type Profile = {
  id: string;
  username: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  age?: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  roles?: string[];
  body_types?: string[];
  ethnicities?: string[];
  looking_for?: string[];
  is_plus?: boolean;
  verified?: boolean;
  online?: boolean;
  last_seen?: string;
  created_at: string;
  updated_at: string;
};

export type Match = {
  id: string;
  user_id: string;
  matched_user_id: string;
  created_at: string;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
};
