"use client";

import { useState, useEffect } from "react";
import { usePortfolio } from "@/lib/contexts/PortfolioContext";

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).map((w) => w[0]).join("").toUpperCase();
}

const NAV_LINKS = [
  { id: "nexus", label: "Home" },
  { id: "arsenal", label: "Arsenal" },
  { id: "quests", label: "Quests" },
  { id: "experience", label: "Experience" },
  { id: "accounts", label: "Accounts" },
  { id: "connect", label: "Connect" },
];

export function TopNav() {
  const { personalInfo } = usePortfolio();
  const initials = personalInfo.name ? getInitials(personalInfo.name) : "JDH";
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
    <header className="nav-entrance fixed top-0 w-full z-50 bg-surface border-b-4 border-black">
      <nav className="flex justify-between items-center h-20 px-5 md:px-margin-desktop w-full max-w-container-max mx-auto">
        {/* Brand */}
        <div className="font-display text-xl md:text-2xl font-bold text-on-surface tracking-tighter select-none">
          NEXUS <span className="bg-tertiary border-2 border-black px-2 ml-1">{initials}</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setActive(link.id)}
              style={{ animationDelay: `${i * 60 + 200}ms` }}
              className={`nav-item-enter relative font-mono text-[11px] tracking-[0.1em] font-bold uppercase transition-colors duration-200 ${
                active === link.id
                  ? "text-primary"
                  : "text-on-surface hover:text-primary"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-[3px] bg-black transition-all duration-300 ${
                  active === link.id ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#connect"
          className="brutal-press hidden md:inline-flex bg-primary text-on-primary font-mono text-[11px] tracking-[0.1em] font-bold uppercase py-2 px-5 border-2 border-black shadow-brutal-sm transition-all"
        >
          CONNECT
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-on-surface p-2 border-2 border-black bg-surface"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined transition-transform duration-200" style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu-enter md:hidden bg-surface border-t-4 border-black px-5 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => { setActive(link.id); setMenuOpen(false); }}
              className={`block font-mono text-[12px] tracking-[0.1em] uppercase py-2 transition-colors ${
                active === link.id ? "text-primary" : "text-on-surface hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#connect"
            onClick={() => setMenuOpen(false)}
            className="brutal-press block bg-primary text-on-primary font-mono text-[11px] tracking-[0.1em] font-bold uppercase py-3 px-4 border-2 border-black shadow-brutal-sm text-center transition-all mt-2"
          >
            CONNECT
          </a>
        </div>
      )}
    </header>
  );
}
