"use client";

import { useMemo } from "react";

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
  const progress = Math.min(100, Math.round((daysLeft / 365) * 100));
  return { daysLeft, progress };
}

export function SideNav() {
  const { daysLeft, progress } = useMemo(getXPData, []);

  return (
    <aside className="sidebar-entrance hidden lg:flex fixed left-0 top-0 h-full w-64 z-40 bg-surface-container-lowest/80 backdrop-blur-2xl border-r border-outline-variant/20 flex-col shadow-2xl pt-24 pb-8">
      {/* Level + XP badge */}
      <div className="px-6 mb-8 nav-item-enter" style={{ animationDelay: "180ms" }}>
        <div className="p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/20">
          <div className="flex items-baseline justify-between">
            <div className="font-display text-3xl font-bold text-tertiary leading-none">LVL 26</div>
            <div className="font-mono text-[10px] text-on-surface-variant">{daysLeft}d left</div>
          </div>
          <div className="font-mono text-[11px] tracking-[0.1em] text-on-surface-variant uppercase mt-1">
            {daysLeft}d to LVL 27 // PALAWAN
          </div>
          {/* XP bar */}
          <div className="w-full bg-surface-container mt-3 h-1.5 rounded-full overflow-hidden">
            <div
              className="xp-bar-glow bg-tertiary h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[9px] text-on-surface-variant/50 mt-1">
            <span>EXP</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-grow space-y-1">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="nav-item-enter text-on-surface-variant hover:bg-surface-variant/30 hover:text-primary px-6 py-3 flex items-center gap-4 transition-all duration-200 cursor-pointer group"
            style={{ animationDelay: `${i * 60 + 250}ms` }}
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200">
              {link.icon}
            </span>
            <span className="font-display text-[18px] font-semibold group-hover:translate-x-0.5 transition-transform duration-200">
              {link.label}
            </span>
          </a>
        ))}
      </nav>

      {/* CTA */}
      <div className="px-6 mt-auto nav-item-enter" style={{ animationDelay: "700ms" }}>
        <a
          href="#connect"
          className="w-full bg-primary text-on-primary py-3 px-4 font-mono text-[11px] tracking-[0.1em] font-bold uppercase rounded-lg hover:brightness-110 hover:shadow-[0_0_20px_rgba(207,188,255,0.35)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">terminal</span>
          Initialize Comms
        </a>
      </div>
    </aside>
  );
}
