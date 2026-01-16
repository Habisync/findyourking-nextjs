'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Event } from '@/lib/types/events';

// Mock events data with coordinates - Replace with Supabase query
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Pride Night Pool Party',
    description: 'Epic poolside celebration',
    event_type: 'party',
    location: 'Madrid, Spain',
    venue_name: 'Sky Terrace Club',
    latitude: 40.4168,
    longitude: -3.7038,
    start_time: new Date(Date.now() + 86400000 * 2).toISOString(),
    end_time: new Date(Date.now() + 86400000 * 2 + 14400000).toISOString(),
    max_attendees: 100,
    current_attendees: 47,
    image_url: '/events/party1.jpg',
    is_private: false,
    host_id: 'user1',
    host_username: 'PoolKing',
    created_at: new Date().toISOString(),
    tags: ['party', 'pool']
  },
  {
    id: '2',
    title: 'Coffee & Connect',
    description: 'Morning coffee meetup',
    event_type: 'meetup',
    location: 'Madrid, Spain',
    venue_name: 'Café Central',
    latitude: 40.4149,
    longitude: -3.7022,
    start_time: new Date(Date.now() + 86400000).toISOString(),
    end_time: new Date(Date.now() + 86400000 + 7200000).toISOString(),
    max_attendees: 20,
    current_attendees: 8,
    is_private: false,
    host_id: 'user2',
    host_username: 'MadridLocal',
    created_at: new Date().toISOString(),
    tags: ['coffee', 'social']
  }
];

export default function EventsMapPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    // In production: Fetch events with coordinates from Supabase
    // const fetchEvents = async () => {
    //   const { data } = await supabase
    //     .from('events')
    //     .select('*')
    //     .not('latitude', 'is', null);
    //   setEvents(data || []);
    // };
    // fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/events"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Events Map</h1>
        </div>
        <button
          onClick={() => setShowList(!showList)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-73px)]">
        {/* Placeholder for Mapbox integration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-cyan-100 to-blue-100 flex items-center justify-center">
          <div className="text-center p-8">
            <svg className="w-24 h-24 text-purple-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive Events Map</h2>
            <p className="text-gray-600 mb-4">Integrate Mapbox here to show event locations</p>
            <p className="text-sm text-purple-600 font-medium">{events.length} events near you</p>
          </div>
        </div>

        {/* Event Markers - Simulated */}
        {events.map((event) => (
          <div
            key={event.id}
            className="absolute"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${30 + Math.random() * 40}%`
            }}
          >
            <button
              onClick={() => setSelectedEvent(event)}
              className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform"
            >
              {event.current_attendees}
            </button>
          </div>
        ))}

        {/* Event Details Card */}
        {selectedEvent && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl p-4 max-w-md animate-slide-up">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedEvent.title}</h3>
                <p className="text-sm text-gray-600">{selectedEvent.venue_name}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-purple-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{selectedEvent.current_attendees} attending</span>
                </div>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {selectedEvent.event_type}
                </span>
              </div>
              <Link
                href={`/events/${selectedEvent.id}`}
                className="block w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg font-semibold text-center hover:opacity-90 transition-opacity"
              >
                View Details
              </Link>
            </div>
          </div>
        )}

        {/* Events List Overlay */}
        {showList && (
          <div className="absolute right-4 top-4 bottom-4 w-80 bg-white rounded-xl shadow-2xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Events Near You</h3>
              <button
                onClick={() => setShowList(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{event.venue_name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-purple-600 font-medium">
                      {event.current_attendees} attending
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
