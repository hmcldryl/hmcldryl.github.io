"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

export function Footer() {
  const { personalInfo } = usePortfolio();
  const name = personalInfo.name || "John Daryl Homecillo";
  const github = personalInfo.github || "https://github.com/hmcldryl";
  const linkedin = personalInfo.linkedin || "https://linkedin.com/in/hmcldryl";
  const email = personalInfo.email || "daryl.homecillo@gmail.com";

  return (
    <footer className="w-full py-8 border-t-4 border-black">
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-margin-desktop max-w-container-max mx-auto gap-3">
        <div className="text-[13px] text-on-surface-variant">
          © {new Date().getFullYear()} {name}
        </div>
        <div className="flex gap-5">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
              className="text-[13px] font-medium text-on-surface-variant hover:text-primary transition-colors">
              GitHub
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer"
              className="text-[13px] font-medium text-on-surface-variant hover:text-primary transition-colors">
              LinkedIn
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`}
              className="text-[13px] font-medium text-on-surface-variant hover:text-primary transition-colors">
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
