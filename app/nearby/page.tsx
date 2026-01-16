import { UserGrid } from '@/components/UserGrid';

const mockNearby = [
  { id: '1', name: 'Lucas M.', age: 27, location: 'San Francisco, CA', image: '/placeholder-avatar-1.jpg', isOnline: true, distance: 0.3, lastSeen: 'Online now' },
  { id: '2', name: 'Ethan B.', age: 30, location: 'San Francisco, CA', image: '/placeholder-avatar-2.jpg', isOnline: true, distance: 0.8, lastSeen: 'Online now' },
  { id: '3', name: 'Noah K.', age: 25, location: 'San Francisco, CA', image: '/placeholder-avatar-3.jpg', isOnline: false, distance: 1.1, lastSeen: '10 minutes ago' }
];

export default function NearbyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400">Nearby</h1>
        <p className="text-cyan-300 text-sm mt-1">{mockNearby.length} people nearby</p>
      </div>
      <div className="p-4">
        <div className="mb-4 flex gap-2">
          <button className="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition">1 mile</button>
          <button className="px-4 py-2 bg-purple-900/50 text-white rounded-full hover:bg-purple-700 transition">5 miles</button>
          <button className="px-4 py-2 bg-purple-900/50 text-white rounded-full hover:bg-purple-700 transition">10 miles</button>
        </div>
        <UserGrid users={mockNearby} />
      </div>
    </div>
  );
}
