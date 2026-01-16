import React from 'react';
import GroupCard from '@/components/GroupCard';
import SearchBar from '@/components/SearchBar';
import TopTabs from '@/components/TopTabs';

// Mock data - Replace with real data from Supabase
const mockGroups = [
  {
    id: '1',
    name: 'NYC Social Club',
    description: 'Meet new friends in the Big Apple',
    image: '/groups/nyc-social.jpg',
    memberCount: 1247,
    isPrivate: false
  },
  {
    id: '2',
    name: 'Fitness Enthusiasts',
    description: 'For those who love staying active and healthy',
    image: '/groups/fitness.jpg',
    memberCount: 892,
    isPrivate: false
  },
  {
    id: '3',
    name: 'Travel Buddies',
    description: 'Connect with fellow travelers and plan adventures',
    image: '/groups/travel.jpg',
    memberCount: 1534,
    isPrivate: false
  },
  {
    id: '4',
    name: 'VIP Members Only',
    description: 'Exclusive group for premium members',
    image: '/groups/vip.jpg',
    memberCount: 234,
    isPrivate: true
  }
];

const tabs = [
  { id: 'popular', label: 'Popular' },
  { id: 'mygroups', label: 'My Groups' },
  { id: 'nearby', label: 'Nearby' }
];

export default function GroupsPage() {
  const handleSearch = (query: string) => {
    console.log('Search groups:', query);
  };

  const handleTabChange = (tabId: string) => {
    console.log('Tab changed:', tabId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
      </div>

      {/* Search Bar */}
      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search groups..."
        showFilters={false}
      />

      {/* Tabs */}
      <TopTabs tabs={tabs} onTabChange={handleTabChange} />

      {/* Groups Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>

        {/* Empty State */}
        {mockGroups.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 text-center mb-2">No groups found</p>
            <p className="text-sm text-gray-400 text-center">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
