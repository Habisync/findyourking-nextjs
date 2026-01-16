"use server";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  sender?: {
    id: string;
    username: string;
    avatar_url: string;
  };
}

export interface Conversation {
  id: string;
  user1_id: string;
  user2_id: string;
  last_message: string;
  last_message_at: string;
  created_at: string;
  updated_at: string;
  other_user: {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    is_online: boolean;
  };
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

  const { data: conversations, error } = await supabase
    .from("conversations")
    .select("*")
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .order("last_message_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch conversations");
  }

  const conversationsWithUsers: Conversation[] = [];

  for (const conv of conversations || []) {
    const otherUserId = conv.user1_id === user.id ? conv.user2_id : conv.user1_id;

    const { data: otherUser, error: userError } = await supabase
      .from("users")
      .select("id, username, full_name, avatar_url, is_online")
      .eq("id", otherUserId)
      .single();

    if (userError || !otherUser) {
      continue;
    }

    const { data: unreadMessages } = await supabase
      .from("messages")
      .select("id")
      .eq("conversation_id", conv.id)
      .eq("receiver_id", user.id)
      .eq("is_read", false);

    conversationsWithUsers.push({
      id: conv.id,
      user1_id: conv.user1_id,
      user2_id: conv.user2_id,
      last_message: conv.last_message,
      last_message_at: conv.last_message_at,
      created_at: conv.created_at,
      updated_at: conv.updated_at,
      other_user: otherUser,
      unread_count: unreadMessages?.length || 0,
    });
  }

  return conversationsWithUsers;
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: messages, error } = await supabase
    .from("messages")
    .select(`
      *,
      sender:users!sender_id (id, username, avatar_url)
    `)
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch messages");
  }

  // Mark messages as read
  await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("conversation_id", conversationId)
    .eq("receiver_id", user.id)
    .eq("is_read", false);

  return messages || [];
}

export async function sendMessage(params: {
  receiverId: string;
  content: string;
}): Promise<{ success: boolean; message?: Message; conversationId?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  // Find or create conversation
  let { data: conversation, error: convError } = await supabase
    .from("conversations")
    .select("*")
    .or(
      `and(user1_id.eq.${user.id},user2_id.eq.${params.receiverId}),and(user1_id.eq.${params.receiverId},user2_id.eq.${user.id})`
    )
    .single();

  if (convError && convError.code === "PGRST116") {
    // Conversation doesn't exist, create it
    const { data: newConversation, error: createError } = await supabase
      .from("conversations")
      .insert({
        user1_id: user.id,
        user2_id: params.receiverId,
        last_message: params.content,
        last_message_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      throw new Error("Failed to create conversation");
    }

    conversation = newConversation;
  }

  if (!conversation) {
    throw new Error("Failed to get conversation");
  }

  // Create message
  const { data: message, error: messageError } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversation.id,
      sender_id: user.id,
      receiver_id: params.receiverId,
      content: params.content,
      is_read: false,
    })
    .select()
    .single();

  if (messageError) {
    throw new Error("Failed to send message");
  }

  // Update conversation
  await supabase
    .from("conversations")
    .update({
      last_message: params.content,
      last_message_at: new Date().toISOString(),
    })
    .eq("id", conversation.id);

  revalidatePath("/chat");

  return {
    success: true,
    message,
    conversationId: conversation.id,
  };
}

export async function getOrCreateConversation(
  userId: string
): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  // Find existing conversation
  let { data: conversation } = await supabase
    .from("conversations")
    .select("id")
    .or(
      `and(user1_id.eq.${user.id},user2_id.eq.${userId}),and(user1_id.eq.${userId},user2_id.eq.${user.id})`
    )
    .single();

  if (conversation) {
    return conversation.id;
  }

  // Create new conversation
  const { data: newConversation, error } = await supabase
    .from("conversations")
    .insert({
      user1_id: user.id,
      user2_id: userId,
      last_message: "",
      last_message_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error || !newConversation) {
    throw new Error("Failed to create conversation");
  }

  return newConversation.id;
}

export async function markAsRead(conversationId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("conversation_id", conversationId)
    .eq("receiver_id", user.id)
    .eq("is_read", false);

  if (error) {
    throw new Error("Failed to mark messages as read");
  }

  revalidatePath("/chat");

  return { success: true };
}
