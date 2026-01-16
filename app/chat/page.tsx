import React from 'react';
import ChatListItem from '@/components/ChatListItem';
import SearchBar from '@/components/SearchBar';

// Mock data - Replace with real data from Supabase
const mockChats = [
  {
    id: '1',
    userId: 'user1',
    username: 'Mike_NYC',
    avatar: '/avatars/user1.jpg',
    lastMessage: 'Hey, how are you doing?',
    timestamp: new Date(Date.now() - 300000),
    unreadCount: 2,
    isOnline: true
  },
  {
    id: '2',
    userId: 'user2',
    username: 'Alex_LA',
    avatar: '/avatars/user2.jpg',
    lastMessage: 'That sounds great! When are you free?',
    timestamp: new Date(Date.now() - 3600000),
    unreadCount: 0,
    isOnline: true
  },
  {
    id: '3',
    userId: 'user3',
    username: 'Chris_SF',
    avatar: '/avatars/user3.jpg',
    lastMessage: 'Thanks for the tip!',
    timestamp: new Date(Date.now() - 86400000),
    unreadCount: 0,
    isOnline: false
  }
];

export default function ChatPage() {
  const handleSearch = (query: string) => {
    console.log('Search:', query);
    // Implement search functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      </div>

      {/* Search Bar */}
      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search conversations..."
        showFilters={false}
      />

      {/* Chat List */}
      <div className="bg-white">
        {mockChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500 text-center mb-2">No messages yet</p>
            <p className="text-sm text-gray-400 text-center">Start a conversation to connect with others</p>
          </div>
        ) : (
          mockChats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} />
          ))
        )}
      </div>
    </div>
  );
}
