"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

export function Footer() {
  const { personalInfo } = usePortfolio();
  const name = personalInfo.name || "John Daryl Homecillo";

  return (
    <footer className="w-full py-12 border-t border-outline-variant/10">
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-margin-desktop max-w-container-max mx-auto gap-4">
        <div className="font-mono text-[12px] tracking-[0.1em] font-bold uppercase text-secondary">
          NEXUS_SYSTEMS
        </div>
        <div className="font-mono text-[12px] text-on-surface-variant text-center">
          © {new Date().getFullYear()} {name} // System.Access_Granted
        </div>
        <div className="flex gap-6">
          <a href="https://github.com/hmcldryl" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[12px] text-on-surface-variant hover:text-tertiary transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/hmcldryl" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[12px] text-on-surface-variant hover:text-tertiary transition-colors">
            LinkedIn
          </a>
          <a href="mailto:daryl.homecillo@gmail.com"
            className="font-mono text-[12px] text-on-surface-variant hover:text-tertiary transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
