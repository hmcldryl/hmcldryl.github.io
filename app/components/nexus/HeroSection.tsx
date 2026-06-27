"use client";

import { useEffect, useRef } from "react";
import { usePortfolio } from "@/lib/contexts/PortfolioContext";

const TERMINAL_LINES = [
  { text: "$ analyzing_core_dependencies...", color: "text-primary" },
  { text: "$ loading_project_registry...", color: "text-on-surface-variant" },
  { text: "$ build_status: SUCCESS", color: "text-tertiary" },
  { text: "$ deploy_target: palawan.ph", color: "text-secondary" },
  { text: "$ system_status: nominal", color: "text-primary" },
];

export function HeroSection() {
  const { personalInfo } = usePortfolio();
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

    let i = 0;
    const cursor = terminal.querySelector(".terminal-cursor");

    const addLine = () => {
      if (i >= TERMINAL_LINES.length) return;
      const line = TERMINAL_LINES[i];
      const div = document.createElement("div");
      div.className = "flex gap-3 opacity-0 translate-y-1 transition-all duration-500";
      div.innerHTML = `<span class="text-primary opacity-40">$</span><span class="${line.color}">${line.text}</span>`;
      if (cursor) terminal.insertBefore(div, cursor);
      requestAnimationFrame(() => div.classList.remove("opacity-0", "translate-y-1"));
      i++;
      if (i < TERMINAL_LINES.length) setTimeout(addLine, 1200);
    };

    const timeout = setTimeout(addLine, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const [firstName, ...rest] = personalInfo.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="nexus" className="min-h-screen flex items-center px-5 md:px-margin-desktop py-24">
      <div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        {/* Left: intro */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-block py-1 px-3 border border-primary/30 rounded-full font-mono text-[12px] text-primary bg-primary/5 tracking-[0.05em]">
            [ SYSTEM ACTIVE: V1.0.0 ]
          </div>

          <h1 className="font-display font-bold text-on-surface leading-none">
            <span className="text-5xl md:text-7xl block">{firstName}</span>
            <span className="text-5xl md:text-7xl block text-primary">{lastName}</span>
          </h1>

          <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed">
            {personalInfo.bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#quests"
              className="bg-primary text-on-primary font-mono text-[11px] tracking-[0.1em] font-bold uppercase py-4 px-8 rounded-lg border border-transparent border-glow hover:brightness-110 active:scale-95 transition-all"
            >
              VIEW_QUESTS
            </a>
            <a
              href="#connect"
              className="border border-outline text-on-surface font-mono text-[11px] tracking-[0.1em] font-bold uppercase py-4 px-8 rounded-lg hover:bg-surface-variant/30 border-glow transition-all"
            >
              CONNECT
            </a>
          </div>
        </div>

        {/* Right: terminal */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl group-hover:opacity-35 transition-opacity rounded-xl" />
          <div className="relative glass-panel rounded-xl overflow-hidden border border-outline-variant/30">
            <div className="bg-surface-container-high/80 px-4 py-3 border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="font-mono text-[11px] text-on-surface-variant opacity-60">
                NEXUS_CORE — Terminal
              </div>
              <div className="w-16" />
            </div>

            <div
              ref={terminalRef}
              className="p-6 font-mono text-[13px] text-[#00F2FE] space-y-2 min-h-[300px]"
            >
              <div className="flex gap-3">
                <span className="text-primary opacity-40">$</span>
                <span>initializing_systems...</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary opacity-40">$</span>
                <span className="text-white">nexus_handshake_established</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary opacity-40">$</span>
                <span className="text-secondary">jd_profile.load()</span>
              </div>
              <div className="flex gap-3 terminal-cursor">
                <span className="text-primary opacity-40">$</span>
                <span>Status: Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
