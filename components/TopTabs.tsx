"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TopTabsProps {
  tabs: Array<{
    label: string;
    href: string;
  }>;
}

export default function TopTabs({ tabs }: TopTabsProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 bg-zinc-900 border-b border-zinc-800">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-6 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "text-royal-500 border-royal-500"
                  : "text-zinc-400 border-transparent hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
