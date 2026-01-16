import { ProfileCard } from '@/components/ProfileCard';
import { SearchBar } from '@/components/SearchBar';
import { UserGrid } from '@/components/UserGrid';

// Mock data for browse page
const mockProfiles = [
  {
    id: '1',
    name: 'Alex Thompson',
    age: 28,
    location: 'San Francisco, CA',
    image: '/placeholder-avatar-1.jpg',
    isOnline: true,
    distance: 2.5,
    lastSeen: 'Online now'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    age: 32,
    location: 'Los Angeles, CA',
    image: '/placeholder-avatar-2.jpg',
    isOnline: false,
    distance: 5.8,
    lastSeen: '15 minutes ago'
  },
  {
    id: '3',
    name: 'Jordan Chen',
    age: 26,
    location: 'San Diego, CA',
    image: '/placeholder-avatar-3.jpg',
    isOnline: true,
    distance: 1.2,
    lastSeen: 'Online now'
  },
  {
    id: '4',
    name: 'David Kim',
    age: 30,
    location: 'Oakland, CA',
    image: '/placeholder-avatar-4.jpg',
    isOnline: false,
    distance: 8.3,
    lastSeen: '2 hours ago'
  },
  {
    id: '5',
    name: 'Ryan Martinez',
    age: 27,
    location: 'Berkeley, CA',
    image: '/placeholder-avatar-5.jpg',
    isOnline: true,
    distance: 3.7,
    lastSeen: 'Online now'
  },
  {
    id: '6',
    name: 'Chris Anderson',
    age: 29,
    location: 'San Jose, CA',
    image: '/placeholder-avatar-6.jpg',
    isOnline: false,
    distance: 12.4,
    lastSeen: '1 hour ago'
  }
];

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400 mb-4">Browse Profiles</h1>
        <SearchBar placeholder="Search by name, location, interests..." />
      </div>

      {/* Filter buttons */}
      <div className="p-4 flex gap-2 overflow-x-auto">
        <button className="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition whitespace-nowrap">
          All
        </button>
        <button className="px-4 py-2 bg-purple-900/50 text-white rounded-full hover:bg-purple-700 transition whitespace-nowrap">
          Online Now
        </button>
        <button className="px-4 py-2 bg-purple-900/50 text-white rounded-full hover:bg-purple-700 transition whitespace-nowrap">
          Nearby
        </button>
        <button className="px-4 py-2 bg-purple-900/50 text-white rounded-full hover:bg-purple-700 transition whitespace-nowrap">
          New Members
        </button>
        <button className="px-4 py-2 bg-purple-900/50 text-white rounded-full hover:bg-purple-700 transition whitespace-nowrap">
          Verified
        </button>
      </div>

      {/* Profiles Grid */}
      <div className="p-4">
        <UserGrid users={mockProfiles} />
      </div>
    </div>
  );
}
