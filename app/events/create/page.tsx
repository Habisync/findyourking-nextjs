'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface EventFormData {
  title: string;
  description: string;
  event_type: 'party' | 'meetup' | 'social' | 'other';
  location: string;
  venue_name: string;
  venue_address: string;
  start_time: string;
  end_time: string;
  max_attendees: string;
  is_private: boolean;
  tags: string;
}

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    event_type: 'party',
    location: '',
    venue_name: '',
    venue_address: '',
    start_time: '',
    end_time: '',
    max_attendees: '50',
    is_private: false,
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In production: Save to Supabase
      // const { data, error } = await supabase
      //   .from('events')
      //   .insert([{
      //     ...formData,
      //     tags: formData.tags.split(',').map(t => t.trim()),
      //     max_attendees: parseInt(formData.max_attendees)
      //   }]);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Event created successfully!');
      router.push('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

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
        <h1 className="text-xl font-bold text-gray-900">Create Event</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Title */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Pride Night Pool Party"
          />
        </div>

        {/* Description */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="Describe your event..."
          />
        </div>

        {/* Event Type */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type *
          </label>
          <select
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="party">Party</option>
            <option value="meetup">Meetup</option>
            <option value="social">Social</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Venue Name */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Venue Name *
          </label>
          <input
            type="text"
            name="venue_name"
            value={formData.venue_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Sky Terrace Club"
          />
        </div>

        {/* Venue Address */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Venue Address *
          </label>
          <input
            type="text"
            name="venue_address"
            value={formData.venue_address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., 123 Main St, City, Country"
          />
        </div>

        {/* Location (City/Country) */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City, Country *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Madrid, Spain"
          />
        </div>

        {/* Date and Time */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date & Time *
            </label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date & Time *
            </label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Max Attendees */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Attendees *
          </label>
          <input
            type="number"
            name="max_attendees"
            value={formData.max_attendees}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Tags */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., party, pool, drinks (comma-separated)"
          />
          <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
        </div>

        {/* Private Event */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_private"
              checked={formData.is_private}
              onChange={handleChange}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <div>
              <span className="font-medium text-gray-900">Private Event</span>
              <p className="text-sm text-gray-500">Only invited users can see and attend</p>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>

      {/* Spacer */}
      <div className="h-8" />
    </div>
  );
}
