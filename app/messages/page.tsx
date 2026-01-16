import { ChatListItem } from '@/components/ChatListItem';

const mockChats = [
  { id: '1', name: 'Alex Thompson', lastMessage: 'Hey! How are you?', time: '2m ago', unread: 2, online: true, avatar: '/placeholder-avatar-1.jpg' },
  { id: '2', name: 'Jordan Chen', lastMessage: 'See you tonight!', time: '1h ago', unread: 0, online: false, avatar: '/placeholder-avatar-2.jpg' },
  { id: '3', name: 'Marcus Rodriguez', lastMessage: 'That sounds great!', time: '3h ago', unread: 1, online: true, avatar: '/placeholder-avatar-3.jpg' }
];

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400">Messages</h1>
        <p className="text-cyan-300 text-sm mt-1">{mockChats.filter(c => c.unread > 0).length} unread</p>
      </div>
      <div className="divide-y divide-purple-700">
        {mockChats.map(chat => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
