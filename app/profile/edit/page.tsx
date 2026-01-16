'use client';

import { useState } from 'react';

export default function EditProfilePage() {
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState('28');
  const [bio, setBio] = useState('Hey there! Looking to meet new people.');
  const [location, setLocation] = useState('San Francisco, CA');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400">Edit Profile</h1>
      </div>
      <div className="p-4 space-y-6">
        {/* Profile Photo */}
        <div className="bg-purple-900/50 rounded-lg p-6">
          <h2 className="text-white font-bold text-lg mb-4">Profile Photos</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square bg-purple-800 rounded-lg flex items-center justify-center text-white text-4xl">
              +
            </div>
            <div className="aspect-square bg-purple-800 rounded-lg"></div>
            <div className="aspect-square bg-purple-800 rounded-lg"></div>
          </div>
          <p className="text-gray-400 text-sm mt-2">Add at least one photo</p>
        </div>

        {/* Basic Info */}
        <div className="bg-purple-900/50 rounded-lg p-6 space-y-4">
          <h2 className="text-white font-bold text-lg mb-4">Basic Information</h2>
          <div>
            <label className="text-white block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-purple-800 text-white rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label className="text-white block mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-purple-800 text-white rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label className="text-white block mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-purple-800 text-white rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label className="text-white block mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full bg-purple-800 text-white rounded-lg px-4 py-3"
            />
          </div>
        </div>

        {/* Interests */}
        <div className="bg-purple-900/50 rounded-lg p-6">
          <h2 className="text-white font-bold text-lg mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {['Sports', 'Music', 'Travel', 'Food', 'Movies', 'Gaming'].map((interest) => (
              <button key={interest} className="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition">
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-4 rounded-lg transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
