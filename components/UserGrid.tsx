import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  id: string;
  username: string;
  profileImage: string;
  distance?: string;
  isOnline: boolean;
  age?: number;
  location?: string;
}

interface UserGridProps {
  users: User[];
  columns?: number;
}

export default function UserGrid({ users, columns = 3 }: UserGridProps) {
  return (
    <div 
      className="grid gap-2 p-2"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`
      }}
    >
      {users.map((user) => (
        <Link 
          key={user.id} 
          href={`/profile/${user.id}`}
          className="relative aspect-square overflow-hidden rounded-lg group"
        >
          <Image
            src={user.profileImage}
            alt={user.username}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 33vw, 25vw"
          />
          
          {/* Online indicator */}
          {user.isOnline && (
            <div className="absolute top-2 left-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
          
          {/* User info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="font-semibold text-sm">{user.username}</p>
                {user.age && (
                  <p className="text-xs opacity-90">{user.age}</p>
                )}
              </div>
              {user.distance && (
                <div className="flex items-center gap-1 text-white text-xs">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {user.distance}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
