"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

export function Footer() {
  const { personalInfo } = usePortfolio();
  const name = personalInfo.name || "John Daryl Homecillo";
  const github = personalInfo.github || "https://github.com/hmcldryl";
  const linkedin = personalInfo.linkedin || "https://linkedin.com/in/hmcldryl";
  const email = personalInfo.email || "daryl.homecillo@gmail.com";

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
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[12px] text-on-surface-variant hover:text-tertiary transition-colors">
              GitHub
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[12px] text-on-surface-variant hover:text-tertiary transition-colors">
              LinkedIn
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`}
              className="font-mono text-[12px] text-on-surface-variant hover:text-tertiary transition-colors">
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
