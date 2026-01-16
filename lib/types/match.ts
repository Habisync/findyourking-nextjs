import { User } from "./user";

export interface Match {
  id: string;
  user_id: string;
  matched_user_id: string;
  created_at: string;
  status: "pending" | "accepted" | "rejected";
  matched_user?: Partial<User>;
}

export interface Like {
  id: string;
  user_id: string;
  liked_user_id: string;
  created_at: string;
  liked_user?: Partial<User>;
}

export interface Pass {
  id: string;
  user_id: string;
  passed_user_id: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  favorited_user_id: string;
  created_at: string;
  favorited_user?: Partial<User>;
}

export interface Block {
  id: string;
  user_id: string;
  blocked_user_id: string;
  reason?: string;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  reason: string;
  details?: string;
  status: "pending" | "reviewed" | "resolved";
  created_at: string;
}
