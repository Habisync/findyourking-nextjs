import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ChatPreview {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
}

interface ChatListItemProps {
  chat: ChatPreview;
}

export default function ChatListItem({ chat }: ChatListItemProps) {
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  return (
    <Link
      href={`/chat/${chat.userId}`}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
    >
      {/* Avatar with Online Status */}
      <div className="relative flex-shrink-0">
        <Image
          src={chat.avatar}
          alt={chat.username}
          width={50}
          height={50}
          className="rounded-full"
        />
        {chat.isOnline && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 truncate">
            {chat.username}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {formatTimestamp(chat.timestamp)}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate">
          {chat.lastMessage}
        </p>
      </div>

      {/* Unread Badge */}
      {chat.unreadCount > 0 && (
        <div className="flex-shrink-0 bg-purple-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
          {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
        </div>
      )}
    </Link>
  );
}
