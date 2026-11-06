"use client";

import { useEffect, useState } from "react";
import packageJson from "@/package.json";
import { ChangelogModal } from "./ChangelogModal";
import { NAV_LINKS } from "./nav";
import { useActiveSection } from "./useActiveSection";

// Page navigation lives in the SideNav from lg up; below that it's this
// header's menu.
export function TopNav() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="nav-entrance fixed top-0 w-full z-50 bg-surface border-b-4 border-black">
      <div className="flex justify-between items-center h-16 px-5 lg:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2 select-none">
          <span className="font-display text-lg font-bold text-on-surface">
            JDHomecillo
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 border border-black bg-tertiary text-on-tertiary">
            v{packageJson.version}
          </span>
        </div>

        {/* Menu toggle */}
        <button
          className="lg:hidden flex text-on-surface p-2 border-2 border-black bg-surface"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="icon text-[20px]">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="mobile-menu-enter lg:hidden bg-surface border-t-4 border-black px-5 py-4 space-y-3"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm py-1.5 transition-colors ${
                active === link.id ? "text-primary-ink font-semibold" : "text-on-surface hover:text-primary-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setChangelogOpen(true);
              setMenuOpen(false);
            }}
            className="block w-full text-left text-sm py-1.5 text-on-surface hover:text-primary-ink transition-colors"
          >
            Changelog
          </button>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="brutal-press-sm block bg-primary text-on-primary text-[13px] font-bold py-2.5 px-4 border-2 border-black shadow-brutal-sm text-center mt-2"
          >
            Contact
          </a>
        </nav>
      )}

      <ChangelogModal open={changelogOpen} onClose={() => setChangelogOpen(false)} />
    </header>
  );
}
