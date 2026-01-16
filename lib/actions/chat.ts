"use server";

import { createClient } from "../supabase";
import { revalidatePath } from "next/cache";

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  sender?: {
    id: string;
    name: string;
    image_url: string;
  };
}

export interface Conversation {
  id: string;
  user_id: string;
  other_user: {
    id: string;
    name: string;
    image_url: string;
    online?: boolean;
  };
  last_message?: Message;
  unread_count: number;
}

export async function getConversations(): Promise<Conversation[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  // Get all matches (conversations)
  const { data: matches } = await supabase
    .from("matches")
    .select(
      `
      *,
      matched_user:users!matched_user_id(
        id,
        name,
        image_url
      )
    `
    )
    .eq("user_id", user.id)
    .eq("status", "accepted");

  if (!matches) return [];

  // For each match, get the last message and unread count
  const conversations = await Promise.all(
    matches.map(async (match) => {
      const { data: lastMessage } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${match.matched_user_id}),and(sender_id.eq.${match.matched_user_id},receiver_id.eq.${user.id})`
        )
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      const { count: unreadCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("sender_id", match.matched_user_id)
        .eq("receiver_id", user.id)
        .eq("read", false);

      return {
        id: match.id,
        user_id: user.id,
        other_user: match.matched_user,
        last_message: lastMessage,
        unread_count: unreadCount || 0,
      };
    })
  );

  return conversations.sort((a, b) => {
    const aTime = a.last_message?.created_at || a.id;
    const bTime = b.last_message?.created_at || b.id;
    return bTime.localeCompare(aTime);
  });
}

export async function getMessages(otherUserId: string): Promise<Message[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: messages, error } = await supabase
    .from("messages")
    .select(
      `
      *,
      sender:users!sender_id(
        id,
        name,
        image_url
      )
    `
    )
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`
    )
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch messages");
  }

  // Mark messages as read
  await supabase
    .from("messages")
    .update({ read: true })
    .eq("receiver_id", user.id)
    .eq("sender_id", otherUserId)
    .eq("read", false);

  return messages || [];
}

export async function sendMessage(
  receiverId: string,
  content: string
): Promise<Message> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: message, error } = await supabase
    .from("messages")
    .insert({
      sender_id: user.id,
      receiver_id: receiverId,
      content,
      read: false,
    })
    .select(
      `
      *,
      sender:users!sender_id(
        id,
        name,
        image_url
      )
    `
    )
    .single();

  if (error) {
    throw new Error("Failed to send message");
  }

  revalidatePath("/chat");
  revalidatePath(`/chat/${receiverId}`);

  return message;
}

export async function deleteMessage(messageId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  await supabase.from("messages").delete().eq("id", messageId).eq("sender_id", user.id);

  revalidatePath("/chat");
}
