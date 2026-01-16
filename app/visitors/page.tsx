import { UserGrid } from '@/components/UserGrid';

const mockVisitors = [
  {
    id: '1',
    name: 'Andrew Wilson',
    age: 26,
    location: 'San Jose, CA',
    image: '/placeholder-avatar-1.jpg',
    isOnline: false,
    distance: 8.7,
    lastSeen: '2 hours ago',
    visitTime: '3 hours ago'
  },
  {
    id: '2',
    name: 'Matt Johnson',
    age: 29,
    location: 'San Francisco, CA',
    image: '/placeholder-avatar-2.jpg',
    isOnline: true,
    distance: 2.3,
    lastSeen: 'Online now',
    visitTime: '5 hours ago'
  },
  {
    id: '3',
    name: 'Daniel Garcia',
    age: 31,
    location: 'Oakland, CA',
    image: '/placeholder-avatar-3.jpg',
    isOnline: false,
    distance: 5.4,
    lastSeen: '1 hour ago',
    visitTime: 'Yesterday'
  }
];

export default function VisitorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400">Profile Visitors</h1>
        <p className="text-cyan-300 text-sm mt-1">{mockVisitors.length} recent visitors</p>
      </div>

      {/* Content */}
      <div className="p-4">
        {mockVisitors.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👀</div>
            <h2 className="text-white text-xl mb-2">No visitors yet</h2>
            <p className="text-gray-400 mb-6">Get more profile views by completing your profile!</p>
            <button className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 px-6 rounded-lg transition">
              Complete Profile
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex gap-2">
              <button className="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition">
                All Visitors
              </button>
              <button className="px-4 py-2 bg-purple-900/50 text-white rounded-full hover:bg-purple-700 transition">
                New
              </button>
              <button className="px-4 py-2 bg-purple-900/50 text-white rounded-full hover:bg-purple-700 transition">
                Favorites Only
              </button>
            </div>
            <UserGrid users={mockVisitors} />
          </div>
        )}
      </div>
    </div>
  );
}
