import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Group {
  id: string;
  name: string;
  description?: string;
  image: string;
  memberCount: number;
  isPrivate: boolean;
}

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <Link 
      href={`/groups/${group.id}`}
      className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
    >
      {/* Group Image */}
      <div className="relative aspect-video">
        <Image
          src={group.image}
          alt={group.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {group.isPrivate && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Private
          </div>
        )}
      </div>

      {/* Group Info */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {group.name}
        </h3>
        {group.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {group.description}
          </p>
        )}
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          {group.memberCount.toLocaleString()} members
        </div>
      </div>
    </Link>
  );
}
