export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  bio: string;
  image_url: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  gender?: "male" | "female" | "non-binary" | "other";
  looking_for?: "male" | "female" | "everyone";
  interests?: string[];
  height?: number;
  ethnicity?: string;
  body_type?: string;
  relationship_status?: "single" | "divorced" | "widowed" | "complicated";
  education?: string;
  occupation?: string;
  company?: string;
  school?: string;
  about_me?: string;
  instagram?: string;
  spotify?: string;
  show_me_men?: boolean;
  show_me_women?: boolean;
  distance_preference?: number;
  age_preference_min?: number;
  age_preference_max?: number;
  verified?: boolean;
  premium?: boolean;
  online?: boolean;
  last_active?: string;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  user_id: string;
  gender_preference?: string;
  min_age?: number;
  max_age?: number;
  max_distance?: number;
  show_age?: boolean;
  show_distance?: boolean;
  discoverable?: boolean;
  read_receipts?: boolean;
  notifications_enabled?: boolean;
  email_notifications?: boolean;
  match_notifications?: boolean;
  message_notifications?: boolean;
  like_notifications?: boolean;
}

export interface UserLocation {
  user_id: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  updated_at: string;
}

export interface UserPhoto {
  id: string;
  user_id: string;
  url: string;
  order: number;
  created_at: string;
}
