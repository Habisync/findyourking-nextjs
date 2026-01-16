import { UserGrid } from '@/components/UserGrid';

const mockMatches = [
  {
    id: '1',
    name: 'Carlos Ramirez',
    age: 29,
    location: 'San Francisco, CA',
    image: '/placeholder-avatar-1.jpg',
    isOnline: true,
    distance: 2.1,
    lastSeen: 'Online now',
    matchTime: '2 days ago'
  }
];

export default function MatchesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400">Matches</h1>
        <p className="text-cyan-300 text-sm mt-1">{mockMatches.length} mutual matches</p>
      </div>
      <div className="p-4">
        {mockMatches.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-white text-xl mb-2">No matches yet</h2>
            <p className="text-gray-400 mb-6">Start liking profiles to get matches!</p>
          </div>
        ) : (
          <UserGrid users={mockMatches} />
        )}
      </div>
    </div>
  );
}
