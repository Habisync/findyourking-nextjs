'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Event } from '@/lib/types/events';
import { notFound } from 'next/navigation';

// This would come from Supabase in production
const mockEvent: Event = {
  id: '1',
  title: 'Pride Night Pool Party',
  description: 'Join us for an epic poolside celebration with amazing DJs, drinks, and an incredible crowd. This is THE summer event you don\'t want to miss!',
  event_type: 'party',
  location: 'Madrid, Spain',
  venue_name: 'Sky Terrace Club',
  venue_address: 'Calle Gran Vía 28, 28013 Madrid',
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
  host_avatar: '/avatars/host1.jpg',
  created_at: new Date().toISOString(),
  tags: ['party', 'pool', 'drinks', 'music', 'pride']
};

interface EventPageProps {
  params: { id: string };
}

export default function EventPage({ params }: EventPageProps) {
  const [event, setEvent] = useState<Event | null>(mockEvent);
  const [isAttending, setIsAttending] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // In production: fetch event from Supabase
    // const fetchEvent = async () => {
    //   const { data } = await supabase
    //     .from('events')
    //     .select('*')
    //     .eq('id', params.id)
    //     .single();
    //   setEvent(data);
    // };
    // fetchEvent();
  }, [params.id]);

  if (!event) {
    notFound();
  }

  const handleAttend = () => {
    setIsAttending(!isAttending);
    // In production: update Supabase
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const attendancePercentage = (event.current_attendees / event.max_attendees) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-4">
        <Link
          href="/events"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Event Details</h1>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 bg-gradient-to-r from-purple-600 to-cyan-500">
        {event.image_url && (
          <div className="absolute inset-0 bg-black/30" />
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-3 mb-2">
            {event.host_avatar && (
              <img
                src={event.host_avatar}
                alt={event.host_username}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            )}
            <div>
              <p className="text-white text-sm">Hosted by</p>
              <p className="text-white font-semibold">{event.host_username}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Title and Tags */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{event.title}</h2>
          <div className="flex flex-wrap gap-2">
            {event.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
          <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-sm text-gray-500 mb-1">When</p>
            <p className="font-semibold text-gray-900">{formatDate(event.start_time)}</p>
            <p className="text-sm text-gray-600 mt-1">Until {formatDate(event.end_time)}</p>
          </div>
        </div>

        {/* Location */}
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Where</p>
              <p className="font-semibold text-gray-900">{event.venue_name}</p>
              <p className="text-sm text-gray-600 mt-1">{event.venue_address || event.location}</p>
            </div>
          </div>
          <button
            onClick={() => setShowMap(!showMap)}
            className="w-full py-2 px-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm"
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
          {showMap && (
            <div className="mt-3 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map placeholder - Integrate Mapbox here</p>
            </div>
          )}
        </div>

        {/* Attendance */}
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">
                  {event.current_attendees} / {event.max_attendees} attending
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-600">{Math.round(attendancePercentage)}% full</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-300"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">About this event</h3>
          <p className="text-gray-600 leading-relaxed">{event.description}</p>
        </div>

        {/* Attend Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button
            onClick={handleAttend}
            className={`w-full py-4 rounded-full font-semibold text-lg transition-all ${
              isAttending
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:opacity-90'
            }`}
          >
            {isAttending ? '✓ Attending' : 'Attend Event'}
          </button>
        </div>
      </div>

      {/* Spacer for fixed button */}
      <div className="h-24" />
    </div>
  );
}
