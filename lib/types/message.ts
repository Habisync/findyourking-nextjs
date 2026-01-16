import { User } from "./user";

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  read_at?: string;
  deleted_by_sender?: boolean;
  deleted_by_receiver?: boolean;
  sender?: Partial<User>;
  receiver?: Partial<User>;
}

export interface Conversation {
  id: string;
  user_id: string;
  other_user_id: string;
  other_user: {
    id: string;
    name: string;
    image_url: string;
    online?: boolean;
    last_active?: string;
  };
  last_message?: Message;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  created_at: string;
  last_message_at?: string;
}
