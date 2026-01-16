import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProfileCard from '@/components/ProfileCard';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

// Mock data - Replace with real data from Supabase
const getMockProfile = (id: string) => ({
  id,
  username: 'John_NYC',
  age: 28,
  location: 'New York, NY',
  bio: 'Fitness enthusiast, travel lover, and coffee addict. Looking to meet new friends and maybe something more.',
  profileImage: '/avatars/profile.jpg',
  photos: [
    '/photos/1.jpg',
    '/photos/2.jpg',
    '/photos/3.jpg',
    '/photos/4.jpg'
  ],
  stats: {
    views: 1247,
    favorites: 89,
    distance: '2.5 km away'
  },
  interests: ['Fitness', 'Travel', 'Music', 'Food'],
  isOnline: true,
  lastSeen: 'Active now'
});

export default function ProfilePage({ params }: ProfilePageProps) {
  const profile = getMockProfile(params.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="flex items-start gap-4">
          {/* Profile Image */}
          <div className="relative">
            <Image
              src={profile.profileImage}
              alt={profile.username}
              width={100}
              height={100}
              className="rounded-full"
            />
            {profile.isOnline && (
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-white" />
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{profile.username}</h2>
              <span className="text-gray-500">{profile.age}</span>
            </div>
            <p className="text-gray-600 mb-2">{profile.location}</p>
            <p className="text-sm text-gray-500 mb-3">{profile.lastSeen}</p>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link
                href={`/chat/${profile.id}`}
                className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-medium"
              >
                Message
              </Link>
              <button className="px-6 py-2 bg-gray-200 text-gray-900 rounded-full hover:bg-gray-300 font-medium">
                ♥ Favorite
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{profile.stats.views}</p>
            <p className="text-sm text-gray-500">Views</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{profile.stats.favorites}</p>
            <p className="text-sm text-gray-500">Favorites</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-purple-600">{profile.stats.distance}</p>
            <p className="text-sm text-gray-500">Distance</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-white p-6 mt-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
        <p className="text-gray-700">{profile.bio}</p>
      </div>

      {/* Interests */}
      <div className="bg-white p-6 mt-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="bg-white p-6 mt-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Photos</h3>
        <div className="grid grid-cols-3 gap-2">
          {profile.photos.map((photo, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
