'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { UserGrid } from '@/components/UserGrid';

const mockResults = [
  {
    id: '1',
    name: 'Michael Stevens',
    age: 29,
    location: 'San Francisco, CA',
    image: '/placeholder-avatar-1.jpg',
    isOnline: true,
    distance: 1.8,
    lastSeen: 'Online now'
  },
  {
    id: '2',
    name: 'Brandon Lee',
    age: 31,
    location: 'Oakland, CA',
    image: '/placeholder-avatar-2.jpg',
    isOnline: false,
    distance: 4.2,
    lastSeen: '30 minutes ago'
  }
];

export default function SearchPage() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 border-b border-purple-700 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gold-400 mb-4">Advanced Search</h1>
        <SearchBar placeholder="Search by name, location..." />
      </div>

      {/* Advanced Filters */}
      <div className="p-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-cyan-400 hover:text-cyan-300 transition mb-4 flex items-center gap-2"
        >
          <span>{showAdvanced ? '▼' : '▶'}</span>
          Advanced Filters
        </button>

        {showAdvanced && (
          <div className="bg-purple-900/50 rounded-lg p-4 space-y-4 mb-6">
            {/* Age Range */}
            <div>
              <label className="text-white block mb-2">Age Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="bg-purple-800 text-white rounded px-3 py-2 w-24"
                />
                <span className="text-white self-center">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="bg-purple-800 text-white rounded px-3 py-2 w-24"
                />
              </div>
            </div>

            {/* Distance */}
            <div>
              <label className="text-white block mb-2">Within Distance</label>
              <select className="bg-purple-800 text-white rounded px-3 py-2 w-full">
                <option>Any distance</option>
                <option>1 mile</option>
                <option>5 miles</option>
                <option>10 miles</option>
                <option>25 miles</option>
                <option>50 miles</option>
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="text-white block mb-2">Body Type</label>
              <select className="bg-purple-800 text-white rounded px-3 py-2 w-full">
                <option>Any</option>
                <option>Slim</option>
                <option>Athletic</option>
                <option>Average</option>
                <option>Muscular</option>
                <option>Large</option>
              </select>
            </div>

            {/* Looking For */}
            <div>
              <label className="text-white block mb-2">Looking For</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white">
                  <input type="checkbox" className="rounded" />
                  Dating
                </label>
                <label className="flex items-center gap-2 text-white">
                  <input type="checkbox" className="rounded" />
                  Friends
                </label>
                <label className="flex items-center gap-2 text-white">
                  <input type="checkbox" className="rounded" />
                  Long-term
                </label>
                <label className="flex items-center gap-2 text-white">
                  <input type="checkbox" className="rounded" />
                  Right now
                </label>
              </div>
            </div>

            <button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 rounded-lg transition">
              Apply Filters
            </button>
          </div>
        )}

        {/* Results */}
        <div className="mb-4">
          <h2 className="text-white text-lg font-semibold mb-2">Search Results ({mockResults.length})</h2>
        </div>

        <UserGrid users={mockResults} />
      </div>
    </div>
  );
}
