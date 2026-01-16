import { UserGrid } from '@/components/UserGrid';

const mockFavorites = [
  {
    id: '1',
    name: 'Jason Miller',
    age: 27,
    location: 'San Francisco, CA',
    image: '/placeholder-avatar-1.jpg',
    isOnline: true,
    distance: 3.2,
    lastSeen: 'Online now'
  },
  {
    id: '2',
    name: 'Tyler Brown',
    age: 30,
    location: 'Berkeley, CA',
    image: '/placeholder-avatar-2.jpg',
    isOnline: false,
    distance: 6.1,
    lastSeen: '1 hour ago'
  },
  {
    id: '3',
    name: 'Kevin Davis',
    age: 28,
    location: 'Oakland, CA',
    image: '/placeholder-avatar-3.jpg',
    isOnline: true,
    distance: 4.5,
    lastSeen: 'Online now'
  }
];

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400">My Favorites</h1>
        <p className="text-cyan-300 text-sm mt-1">{mockFavorites.length} profiles saved</p>
      </div>

      {/* Content */}
      <div className="p-4">
        {mockFavorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-white text-xl mb-2">No favorites yet</h2>
            <p className="text-gray-400 mb-6">Start favoriting profiles you like!</p>
            <button className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 px-6 rounded-lg transition">
              Browse Profiles
            </button>
          </div>
        ) : (
          <UserGrid users={mockFavorites} />
        )}
      </div>
    </div>
  );
}
