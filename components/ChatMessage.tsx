import React from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  senderAvatar?: string;
  senderName?: string;
}

export default function ChatMessage({ 
  message, 
  isCurrentUser,
  senderAvatar,
  senderName 
}: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className={`flex gap-2 mb-4 ${
      isCurrentUser ? 'flex-row-reverse' : 'flex-row'
    }`}>
      {/* Avatar */}
      {!isCurrentUser && senderAvatar && (
        <div className="flex-shrink-0">
          <Image
            src={senderAvatar}
            alt={senderName || 'User'}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      )}

      {/* Message Content */}
      <div className={`max-w-[70%] ${
        isCurrentUser ? 'items-end' : 'items-start'
      }`}>
        {/* Sender Name (for received messages) */}
        {!isCurrentUser && senderName && (
          <p className="text-xs text-gray-500 mb-1 px-3">{senderName}</p>
        )}
        
        {/* Message Bubble */}
        <div className={`rounded-2xl px-4 py-2 ${
          isCurrentUser 
            ? 'bg-purple-600 text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-900 rounded-bl-none'
        }`}>
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        {/* Timestamp & Read Status */}
        <div className={`flex items-center gap-1 mt-1 px-3 ${
          isCurrentUser ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>
          {isCurrentUser && (
            <span className="text-xs">
              {message.read ? (
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
