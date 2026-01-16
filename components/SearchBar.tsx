"use client";

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  showFilters?: boolean;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search users...",
  showFilters = true 
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-3">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 pl-10 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Button */}
        {showFilters && (
          <button
            type="button"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        )}
      </form>

      {/* Filter Menu */}
      {showFilterMenu && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Age Range</label>
            <div className="flex gap-2 mt-1">
              <input type="number" placeholder="Min" className="w-20 px-2 py-1 border rounded" />
              <span className="self-center">-</span>
              <input type="number" placeholder="Max" className="w-20 px-2 py-1 border rounded" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Distance</label>
            <input type="range" min="1" max="100" className="w-full" />
          </div>
          <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
