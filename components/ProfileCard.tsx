import Image from "next/image";
import Link from "next/link";
import { MapPin, Check, Crown } from "lucide-react";
import type { Profile } from "@/lib/supabase";

interface ProfileCardProps {
  profile: Profile;
  distance?: number;
}

export default function ProfileCard({ profile, distance }: ProfileCardProps) {
  const displayName = profile.display_name || profile.username;
  const age = profile.age ? `, ${profile.age}` : "";

  return (
    <Link
      href={`/profile/${profile.id}`}
      className="block relative rounded-lg overflow-hidden bg-zinc-900 hover:ring-2 hover:ring-royal-500 transition-all group"
    >
      {/* Avatar */}
      <div className="relative aspect-square">
        <Image
          src={profile.avatar_url || "/placeholder-avatar.jpg"}
          alt={displayName}
          fill
          className="object-cover"
        />
        {/* Online indicator */}
        {profile.online && (
          <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
        )}
        {/* PLUS badge */}
        {profile.is_plus && (
          <div className="absolute top-2 left-2 bg-gradient-premium px-2 py-1 rounded-md flex items-center gap-1">
            <Crown className="w-3 h-3 text-white" />
            <span className="text-xs font-semibold text-white">PLUS</span>
          </div>
        )}
        {/* Verified badge */}
        {profile.verified && (
          <div className="absolute bottom-2 right-2 bg-cyan-500 rounded-full p-1">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-white truncate">
          {displayName}
          {age}
        </h3>
        {distance !== undefined && (
          <div className="flex items-center gap-1 text-sm text-zinc-400 mt-1">
            <MapPin className="w-3 h-3" />
            <span>{distance < 1 ? "< 1" : Math.round(distance)} km</span>
          </div>
        )}
      </div>
    </Link>
  );
}
