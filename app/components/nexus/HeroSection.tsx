"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

export function HeroSection() {
  const { personalInfo } = usePortfolio();

  return (
    <section id="nexus" className="relative min-h-[85vh] flex items-center px-5 md:px-margin-desktop py-16 overflow-hidden">
      <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        {/* Left: intro */}
        <div className="lg:col-span-7 space-y-5">
          <h1 className="font-display font-bold text-on-surface text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight whitespace-nowrap">
            {personalInfo.name}
          </h1>

          {personalInfo.tagline && (
            <p className="text-primary font-semibold text-base md:text-lg">
              {personalInfo.tagline}
            </p>
          )}

          <p className="font-body text-base text-on-surface-variant max-w-xl leading-relaxed">
            {personalInfo.bio}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#projects"
              className="brutal-press bg-black text-background text-[13px] font-bold py-2.5 px-6 border-2 border-black shadow-brutal-sm transition-all"
            >
              View Projects
            </a>
            <a
              href="#connect"
              className="brutal-press bg-surface border-2 border-black text-on-surface text-[13px] font-bold py-2.5 px-6 shadow-brutal-sm transition-all"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Right: photo */}
        <div className="lg:col-span-5 relative">
          <div className="relative flex justify-center items-end min-h-[320px]">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-56 h-56 bg-tertiary border-2 border-black -z-10" />
            {personalInfo.photoUrl ? (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.name}
                className="relative z-10 max-h-[380px] w-auto object-contain select-none"
              />
            ) : (
              <div className="relative z-10 w-56 h-56 border-2 border-black bg-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-[64px] text-on-surface-variant/30">person</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
