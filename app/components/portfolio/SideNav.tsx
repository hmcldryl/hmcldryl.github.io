"use client";

import { useState } from "react";
import { ChangelogModal } from "./ChangelogModal";
import { NAV_LINKS } from "./nav";
import { useActiveSection } from "./useActiveSection";

export function SideNav() {
  const active = useActiveSection();
  const [changelogOpen, setChangelogOpen] = useState(false);

  return (
    <aside className="sidebar-entrance hidden lg:flex fixed left-0 top-0 h-full w-56 z-40 bg-surface border-r-4 border-black flex-col pt-24 pb-8">
      {/* Nav links */}
      <nav aria-label="Main" className="flex-grow space-y-1 px-3">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            aria-current={active === link.id ? "true" : undefined}
            className={`px-3 py-2.5 flex items-center gap-3 transition-colors duration-150 border-2 ${
              active === link.id
                ? "bg-black text-background border-black"
                : "text-on-surface border-transparent hover:bg-black hover:text-background hover:border-black"
            }`}
          >
            <span className="icon text-[18px]">
              {link.icon}
            </span>
            <span className="text-[14px] font-medium">
              {link.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Changelog + CTA */}
      <div className="px-6 mt-auto space-y-2">
        <button
          onClick={() => setChangelogOpen(true)}
          className="brutal-press-sm w-full bg-surface text-on-surface py-2.5 px-4 text-[13px] font-bold border-2 border-black shadow-brutal-sm flex items-center justify-center gap-2"
        >
          <span className="icon text-[16px]">history</span>
          Changelog
        </button>
        <a
          href="#contact"
          className="brutal-press-sm w-full bg-primary text-on-primary py-2.5 px-4 text-[13px] font-bold border-2 border-black shadow-brutal-sm flex items-center justify-center gap-2"
        >
          Contact
        </a>
      </div>

      <ChangelogModal open={changelogOpen} onClose={() => setChangelogOpen(false)} />
    </aside>
  );
}
