"use client";

import { useEffect, useRef, useMemo } from "react";
import { usePortfolio } from "@/lib/contexts/PortfolioContext";

export function HeroSection() {
  const { personalInfo } = usePortfolio();
  const terminalLines = useMemo(() => {
    const deployTarget = personalInfo.location
      ? personalInfo.location.toLowerCase().replace(/\s+/g, "-") + ".dev"
      : "palawan.dev";
    return [
      { text: "$ analyzing_core_dependencies...", color: "text-on-surface" },
      { text: "$ loading_project_registry...", color: "text-on-surface" },
      { text: "$ build_status: SUCCESS", color: "text-tertiary" },
      { text: `$ deploy_target: ${deployTarget}`, color: "text-secondary" },
      { text: "$ system_status: nominal", color: "text-primary" },
    ];
  }, [personalInfo.location]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

    let i = 0;
    const cursor = terminal.querySelector(".terminal-cursor");

    const addLine = () => {
      if (i >= terminalLines.length) return;
      const line = terminalLines[i];
      const div = document.createElement("div");
      div.className = "flex gap-3 opacity-0 translate-y-1 transition-all duration-500";
      const prefix = document.createElement("span");
      prefix.className = "text-primary font-bold";
      prefix.textContent = "$";
      const text = document.createElement("span");
      text.className = line.color;
      text.textContent = line.text;
      div.appendChild(prefix);
      div.appendChild(text);
      if (cursor) terminal.insertBefore(div, cursor);
      requestAnimationFrame(() => div.classList.remove("opacity-0", "translate-y-1"));
      i++;
      if (i < terminalLines.length) setTimeout(addLine, 1200);
    };

    const timeout = setTimeout(addLine, 1500);
    return () => clearTimeout(timeout);
  }, [terminalLines]);

  const [firstName, ...rest] = personalInfo.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="nexus" className="relative min-h-screen flex items-center px-5 md:px-margin-desktop py-24 overflow-hidden">
      <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        {/* Left: intro */}
        <div className="lg:col-span-7 space-y-6">
          <div className="hero-entry hero-entry-1 inline-block py-1 px-3 border-2 border-black bg-tertiary font-mono text-[12px] font-bold text-on-tertiary tracking-[0.05em]">
            [ SYSTEM ACTIVE: V1.0.0 ]
          </div>

          <h1 className="font-display font-bold text-on-surface leading-[0.95]">
            <span className="hero-entry hero-entry-2 text-5xl md:text-7xl block">{firstName}</span>
            <span className="hero-entry hero-entry-3 text-5xl md:text-7xl block text-primary">{lastName}</span>
          </h1>

          <p className="hero-entry hero-entry-4 font-body text-lg text-on-surface-variant max-w-xl leading-relaxed">
            {personalInfo.bio}
          </p>

          <div className="hero-entry hero-entry-5 flex flex-wrap gap-4 pt-2">
            <a
              href="#quests"
              className="brutal-press bg-black text-background font-mono text-[11px] tracking-[0.1em] font-bold uppercase py-4 px-8 border-2 border-black shadow-brutal transition-all"
            >
              VIEW_QUESTS
            </a>
            <a
              href="#connect"
              className="brutal-press bg-surface border-2 border-black text-on-surface font-mono text-[11px] tracking-[0.1em] font-bold uppercase py-4 px-8 shadow-brutal transition-all"
            >
              CONNECT
            </a>
          </div>
        </div>

        {/* Right: photo (if set) or terminal */}
        <div className="lg:col-span-5 relative">
          {personalInfo.photoUrl ? (
            <div className="relative flex justify-center items-end min-h-[420px]">
              {/* Solid accent block behind photo — no blur */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-64 bg-tertiary border-2 border-black -z-10" />
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.name}
                className="relative z-10 max-h-[480px] w-auto object-contain select-none"
              />
            </div>
          ) : (
            <div className="relative">
              <div className="brutal-panel overflow-hidden">
                <div className="bg-black px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary border border-background" />
                    <div className="w-3 h-3 rounded-full bg-tertiary border border-background" />
                    <div className="w-3 h-3 rounded-full bg-primary border border-background" />
                  </div>
                  <div className="font-mono text-[11px] text-background opacity-70">
                    NEXUS_CORE — Terminal
                  </div>
                  <div className="w-16" />
                </div>
                <div
                  ref={terminalRef}
                  className="p-6 font-mono text-[13px] text-on-surface space-y-2 min-h-[300px] bg-surface"
                >
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">$</span>
                    <span>initializing_systems...</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">$</span>
                    <span className="font-bold">nexus_handshake_established</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">$</span>
                    <span className="text-secondary">jd_profile.load()</span>
                  </div>
                  <div className="flex gap-3 terminal-cursor">
                    <span className="text-primary font-bold">$</span>
                    <span>Status: Ready</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
