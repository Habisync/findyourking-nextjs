'use client';

import React, { useState } from 'react';
import EventCard from '@/components/EventCard';
import SearchBar from '@/components/SearchBar';
import TopTabs from '@/components/TopTabs';
import Link from 'next/link';
import type { Event } from '@/lib/types/events';

// Mock data - Replace with real Supabase query
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Pride Night Pool Party',
    description: 'Join us for an epic poolside celebration',
    event_type: 'party',
    location: 'Madrid, Spain',
    venue_name: 'Sky Terrace Club',
    start_time: new Date(Date.now() + 86400000 * 2).toISOString(),
    end_time: new Date(Date.now() + 86400000 * 2 + 14400000).toISOString(),
    max_attendees: 100,
    current_attendees: 47,
    image_url: '/events/party1.jpg',
    is_private: false,
    host_id: 'user1',
    host_username: 'PoolKing',
    host_avatar: '/avatars/host1.jpg',
    created_at: new Date().toISOString(),
    tags: ['party', 'pool', 'drinks']
  },
  {
    id: '2',
    title: 'Coffee & Connect Meetup',
    description: 'Casual morning coffee for new connections',
    event_type: 'meetup',
    location: 'Madrid, Spain',
    venue_name: 'Café Central',
    start_time: new Date(Date.now() + 86400000).toISOString(),
    end_time: new Date(Date.now() + 86400000 + 7200000).toISOString(),
    max_attendees: 20,
    current_attendees: 8,
    image_url: '/events/coffee.jpg',
    is_private: false,
    host_id: 'user2',
    host_username: 'MadridLocal',
    created_at: new Date().toISOString(),
    tags: ['coffee', 'social', 'morning']
  },
  {
    id: '3',
    title: 'Exclusive VIP Gathering',
    description: 'Private event for select members',
    event_type: 'social',
    location: 'Madrid, Spain',
    venue_name: 'Private Penthouse',
    start_time: new Date(Date.now() + 86400000 * 3).toISOString(),
    end_time: new Date(Date.now() + 86400000 * 3 + 18000000).toISOString(),
    max_attendees: 30,
    current_attendees: 30,
    is_private: true,
    host_id: 'user3',
    host_username: 'VIPHost',
    created_at: new Date().toISOString(),
    tags: ['vip', 'exclusive']
  }
];

const tabs = [
  { id: 'discover', label: 'Discover' },
  { id: 'attending', label: 'Attending' },
  { id: 'hosting', label: 'Hosting' }
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('discover');
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const handleSearch = (query: string) => {
    console.log('Search events:', query);
    // Implement search logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <Link
          href="/events/create"
          className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Event
        </Link>
      </div>

      {/* Search */}
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search events..."
        showFilters={false}
      />

      {/* Tabs */}
      <TopTabs tabs={tabs} onTabChange={setActiveTab} />

      {/* Events Grid */}
      <div className="p-4">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <svg className="w-20 h-20 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Be the first to create an event!</p>
            <Link
              href="/events/create"
              className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-medium"
            >
              Create Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
