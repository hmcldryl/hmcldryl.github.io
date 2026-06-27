"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { id: "nexus", label: "Nexus" },
  { id: "arsenal", label: "Arsenal" },
  { id: "quests", label: "Quests" },
  { id: "experience", label: "Experience" },
  { id: "connect", label: "Connect" },
];

export function TopNav() {
  const [active, setActive] = useState("nexus");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) {
          setActive(NAV_LINKS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_0_40px_rgba(207,188,255,0.05)]">
      <nav className="flex justify-between items-center h-20 px-5 md:px-margin-desktop w-full max-w-container-max mx-auto">
        {/* Brand */}
        <div className="font-display text-xl md:text-2xl font-bold text-primary tracking-tighter">
          NEXUS // DEV
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setActive(link.id)}
              className={`font-mono text-[11px] tracking-[0.1em] font-bold uppercase transition-colors ${
                active === link.id
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#connect"
          className="hidden md:inline-flex bg-primary text-on-primary font-mono text-[11px] tracking-[0.1em] font-bold uppercase py-2 px-5 rounded-lg hover:brightness-110 active:scale-95 transition-all"
        >
          CONNECT
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20 px-5 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => { setActive(link.id); setMenuOpen(false); }}
              className="block font-mono text-[12px] tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#connect"
            onClick={() => setMenuOpen(false)}
            className="block bg-primary text-on-primary font-mono text-[11px] tracking-[0.1em] font-bold uppercase py-3 px-4 rounded-lg text-center hover:brightness-110 transition-all mt-2"
          >
            CONNECT
          </a>
        </div>
      )}
    </header>
  );
}
