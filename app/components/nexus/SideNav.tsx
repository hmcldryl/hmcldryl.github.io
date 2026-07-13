"use client";

import { useMemo } from "react";
import { usePortfolio } from "@/lib/contexts/PortfolioContext";

const NAV_LINKS = [
  { id: "nexus", label: "Home", icon: "home" },
  { id: "arsenal", label: "Arsenal", icon: "swords" },
  { id: "quests", label: "Quests", icon: "task_alt" },
  { id: "experience", label: "Experience", icon: "military_tech" },
  { id: "accounts", label: "Accounts", icon: "manage_accounts" },
  { id: "connect", label: "Connect", icon: "alternate_email" },
];

function getXPData() {
  const now = new Date();
  const year = now.getFullYear();
  // Birthday: May 27
  let next = new Date(year, 4, 27);
  if (next.getTime() <= now.getTime()) next = new Date(year + 1, 4, 27);
  const msLeft = next.getTime() - now.getTime();
  const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
  const progress = Math.min(100, Math.round(((365 - daysLeft) / 365) * 100));
  return { daysLeft, progress };
}

export function SideNav() {
  const { personalInfo } = usePortfolio();
  const location = personalInfo.location ? personalInfo.location.toUpperCase() : "PALAWAN";
  const { progress } = useMemo(() => getXPData(), []);

  return (
    <aside className="sidebar-entrance hidden lg:flex fixed left-0 top-0 h-full w-64 z-40 bg-surface border-r-4 border-black flex-col pt-24 pb-8">
      {/* Level + XP badge */}
      <div className="px-6 mb-8 nav-item-enter" style={{ animationDelay: "180ms" }}>
        <div className="p-4 bg-tertiary border-[3px] border-black shadow-brutal-sm">
          <div className="font-display text-3xl font-bold text-on-tertiary leading-none">LVL 26</div>
          <div className="font-mono text-[11px] tracking-[0.1em] text-on-tertiary uppercase mt-1">
            EXP // {location}
          </div>
          {/* XP bar */}
          <div className="w-full bg-surface mt-3 h-3 border-2 border-black overflow-hidden">
            <div
              className="bg-black h-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[9px] text-on-tertiary mt-1">
            <span>EXP</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-grow space-y-1 px-3">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="nav-item-enter text-on-surface hover:bg-black hover:text-background px-3 py-3 flex items-center gap-4 transition-colors duration-150 cursor-pointer group border-2 border-transparent hover:border-black"
            style={{ animationDelay: `${i * 60 + 250}ms` }}
          >
            <span className="material-symbols-outlined text-[20px]">
              {link.icon}
            </span>
            <span className="font-display text-[18px] font-semibold">
              {link.label}
            </span>
          </a>
        ))}
      </nav>

      {/* CTA */}
      <div className="px-6 mt-auto nav-item-enter" style={{ animationDelay: "700ms" }}>
        <a
          href="#connect"
          className="brutal-press w-full bg-primary text-on-primary py-3 px-4 font-mono text-[11px] tracking-[0.1em] font-bold uppercase border-2 border-black shadow-brutal-sm transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">terminal</span>
          Initialize Comms
        </a>
      </div>
    </aside>
  );
}
