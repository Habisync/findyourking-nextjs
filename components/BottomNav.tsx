"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radar, Users, MessageCircle, UsersRound, Menu } from "lucide-react";

const navItems = [
  { href: "/radar/discover", label: "Radar", icon: Radar },
  { href: "/cruise", label: "Cruise", icon: Users },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/groups", label: "Groups", icon: UsersRound },
  { href: "/more", label: "More", icon: Menu },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                isActive
                  ? "text-royal-500"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
