"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "links", label: "Links" },
];

export function TopNav() {
  const [active, setActive] = useState("home");
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
      <nav className="flex justify-between items-center h-16 px-5 md:px-margin-desktop w-full max-w-container-max mx-auto">
        {/* Brand */}
        <div className="font-display text-lg font-bold text-on-surface select-none">
          JDHomecillo
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setActive(link.id)}
              className={`relative text-[13px] font-medium transition-colors duration-200 ${
                active === link.id
                  ? "text-primary"
                  : "text-on-surface hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#connect"
          className="brutal-press hidden md:inline-flex bg-primary text-on-primary text-[13px] font-bold py-1.5 px-4 border-2 border-black shadow-brutal-sm transition-all"
        >
          Contact
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-on-surface p-2 border-2 border-black bg-surface"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[20px] transition-transform duration-200" style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
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
              className={`block text-sm py-1.5 transition-colors ${
                active === link.id ? "text-primary" : "text-on-surface hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#connect"
            onClick={() => setMenuOpen(false)}
            className="brutal-press block bg-primary text-on-primary text-[13px] font-bold py-2.5 px-4 border-2 border-black shadow-brutal-sm text-center transition-all mt-2"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
