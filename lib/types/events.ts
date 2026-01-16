// Event Types for FindYourKing Events System

export interface Event {
  id: string;
  title: string;
  description: string;
  event_type: 'party' | 'meetup' | 'social' | 'sports' | 'culture' | 'other';
  location: string;
  venue_name?: string;
  start_time: string;
  end_time: string;
  max_attendees?: number;
  current_attendees: number;
  image_url?: string;
  is_private: boolean;
  host_id: string;
  host_username: string;
  host_avatar?: string;
  created_at: string;
  tags?: string[];
}

export interface EventMember {
  id: string;
  event_id: string;
  user_id: string;
  username: string;
  avatar?: string;
  status: 'going' | 'maybe' | 'invited' | 'declined';
  joined_at: string;
}

export interface EventMessage {
  id: string;
  event_id: string;
  sender_id: string;
  sender_username: string;
  sender_avatar?: string;
  content: string;
  created_at: string;
  is_announcement?: boolean;
}

export interface EventInvite {
  id: string;
  event_id: string;
  inviter_id: string;
  invitee_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

export interface CreateEventInput {
  title: string;
  description: string;
  event_type: Event['event_type'];
  location: string;
  venue_name?: string;
  start_time: string;
  end_time: string;
  max_attendees?: number;
  image_url?: string;
  is_private: boolean;
  tags?: string[];
}

export interface EventFilters {
  type?: Event['event_type'];
  startDate?: string;
  endDate?: string;
  maxDistance?: number;
  tags?: string[];
  privateOnly?: boolean;
}
