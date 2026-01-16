import Link from "next/link";
import { Crown, Radar, Users, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo & Brand */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-royal">
            <Crown className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-display font-bold gradient-royal bg-clip-text text-transparent">
            FindYourKing
          </h1>
          <p className="text-xl text-zinc-400">
            Royal Dating for Kings
          </p>
        </div>

        {/* Description */}
        <p className="text-zinc-300 text-lg">
          Premium LGBTQ+ dating combining the best of MachoBB and ROMEO.
          <br />
          Discover nearby kings with geolocation radar, premium features, and
          real-time chat.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/radar/discover"
            className="px-8 py-4 bg-gradient-royal text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Radar className="w-5 h-5" />
            Explore Radar
          </Link>
          <Link
            href="/cruise"
            className="px-8 py-4 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            Start Cruising
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          <div className="p-4 bg-zinc-900 rounded-lg">
            <Radar className="w-6 h-6 text-royal-500 mx-auto mb-2" />
            <p className="text-sm text-zinc-400">Geo Radar</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg">
            <MessageCircle className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
            <p className="text-sm text-zinc-400">Real-time Chat</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg">
            <Users className="w-6 h-6 text-royal-500 mx-auto mb-2" />
            <p className="text-sm text-zinc-400">Groups & Events</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg">
            <Crown className="w-6 h-6 text-gold-500 mx-auto mb-2" />
            <p className="text-sm text-zinc-400">PLUS Features</p>
          </div>
        </div>
      </div>
    </main>
  );
}
