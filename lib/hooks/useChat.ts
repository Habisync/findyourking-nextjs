"use client";

import { useState, useEffect } from "react";
import { getConversations, getMessages, sendMessage } from "../actions/chat";
import { Conversation, Message } from "../types/message";

export function useChat(otherUserId?: string) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (otherUserId) {
      loadMessages(otherUserId);
    }
  }, [otherUserId]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (userId: string) => {
    try {
      setLoading(true);
      const data = await getMessages(userId);
      setMessages(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const send = async (receiverId: string, content: string) => {
    try {
      setSending(true);
      const newMessage = await sendMessage(receiverId, content);
      setMessages((prev) => [...prev, newMessage]);
      await loadConversations();
      return newMessage;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setSending(false);
    }
  };

  return {
    conversations,
    messages,
    loading,
    sending,
    error,
    send,
    refreshConversations: loadConversations,
    refreshMessages: loadMessages,
  };
}
