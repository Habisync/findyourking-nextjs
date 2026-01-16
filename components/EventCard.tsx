import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/lib/types/events';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getEventTypeColor = (type: Event['event_type']) => {
    const colors = {
      party: 'bg-purple-100 text-purple-700',
      meetup: 'bg-cyan-100 text-cyan-700',
      social: 'bg-blue-100 text-blue-700',
      sports: 'bg-green-100 text-green-700',
      culture: 'bg-yellow-100 text-yellow-700',
      other: 'bg-gray-100 text-gray-700'
    };
    return colors[type] || colors.other;
  };

  const isFull = event.max_attendees && event.current_attendees >= event.max_attendees;

  return (
    <Link
      href={`/events/${event.id}`}
      className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
    >
      {/* Event Image */}
      <div className="relative aspect-video">
        <Image
          src={event.image_url || '/event-default.jpg'}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Event Type Badge */}
        <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${
          getEventTypeColor(event.event_type)
        }`}>
          {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
        </div>

        {/* Private Badge */}
        {event.is_private && (
          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Private
          </div>
        )}

        {/* Full Badge */}
        {isFull && (
          <div className="absolute bottom-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            FULL
          </div>
        )}
      </div>

      {/* Event Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">
          {event.title}
        </h3>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(event.start_time)}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">
            {event.venue_name || event.location}
          </span>
        </div>

        {/* Host & Attendees */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          {/* Host */}
          <div className="flex items-center gap-2">
            <Image
              src={event.host_avatar || '/default-avatar.png'}
              alt={event.host_username}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-gray-700">@{event.host_username}</span>
          </div>

          {/* Attendees Count */}
          <div className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-gray-700 font-medium">
              {event.current_attendees}
              {event.max_attendees && `/${event.max_attendees}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
