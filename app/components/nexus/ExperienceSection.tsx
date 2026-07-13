"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

type ColorKey = "primary" | "secondary" | "tertiary";

const NODE_COLORS: Record<ColorKey, { bg: string; text: string }> = {
  primary: { bg: "bg-primary", text: "text-on-primary" },
  secondary: { bg: "bg-secondary", text: "text-on-secondary" },
  tertiary: { bg: "bg-tertiary", text: "text-on-tertiary" },
};

const DEFAULT_NODE = NODE_COLORS.primary;

export function ExperienceSection() {
  const { experience } = usePortfolio();

  return (
    <section id="experience" className="py-24 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-3">
            Experience Quest
          </h2>
          <p className="text-on-surface-variant font-body">
            The timeline of professional deployment.
          </p>
        </div>

        <div className="relative quest-line py-10">
          {experience.map((item, idx) => {
            const colors = NODE_COLORS[item.color as ColorKey] ?? DEFAULT_NODE;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={`${item.role}-${item.company}`}
                className={`relative mb-20 md:mb-16 flex flex-col md:flex-row items-center justify-between ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`md:w-5/12 text-center mb-6 md:mb-0 ${
                    isEven ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <h3 className="font-display text-xl font-semibold text-on-surface">
                    {item.role}
                  </h3>
                  <div className="font-mono text-[11px] tracking-[0.05em] text-on-surface-variant mt-1">
                    {item.company}{" // "}{item.period}
                  </div>
                </div>

                <div
                  className={`relative z-10 w-12 h-12 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 ${colors.bg}`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${colors.text}`}>
                    {item.icon}
                  </span>
                </div>

                <div
                  className={`md:w-5/12 text-center mt-6 md:mt-0 ${
                    isEven ? "md:text-left md:pl-10" : "md:text-right md:pr-10"
                  }`}
                >
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
