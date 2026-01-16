import { UserGrid } from '@/components/UserGrid';

const mockLiked = [
  {
    id: '1',
    name: 'Sam Peterson',
    age: 28,
    location: 'San Francisco, CA',
    image: '/placeholder-avatar-1.jpg',
    isOnline: true,
    distance: 1.5,
    lastSeen: 'Online now',
    likedTime: '1 hour ago'
  },
  {
    id: '2',
    name: 'Nick Turner',
    age: 26,
    location: 'Berkeley, CA',
    image: '/placeholder-avatar-2.jpg',
    isOnline: false,
    distance: 3.8,
    lastSeen: '45 minutes ago',
    likedTime: '3 hours ago'
  }
];

export default function LikedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400">Liked Me</h1>
        <p className="text-cyan-300 text-sm mt-1">{mockLiked.length} people liked you</p>
      </div>
      <div className="p-4">
        {mockLiked.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💕</div>
            <h2 className="text-white text-xl mb-2">No likes yet</h2>
            <p className="text-gray-400 mb-6">Be more active to get likes!</p>
          </div>
        ) : (
          <UserGrid users={mockLiked} />
        )}
      </div>
    </div>
  );
}
