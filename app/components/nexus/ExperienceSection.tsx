"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

type ColorKey = "primary" | "secondary" | "tertiary";

const NODE_COLORS: Record<ColorKey, { border: string; text: string; shadow: string }> = {
  primary: {
    border: "border-primary",
    text: "text-primary",
    shadow: "shadow-[0_0_15px_rgba(207,188,255,0.4)]",
  },
  secondary: {
    border: "border-secondary",
    text: "text-secondary",
    shadow: "shadow-[0_0_15px_rgba(205,192,233,0.4)]",
  },
  tertiary: {
    border: "border-tertiary",
    text: "text-tertiary",
    shadow: "shadow-[0_0_15px_rgba(231,195,101,0.4)]",
  },
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
                  <h3 className={`font-display text-xl font-semibold ${colors.text}`}>
                    {item.role}
                  </h3>
                  <div className="font-mono text-[11px] tracking-[0.05em] text-on-surface-variant mt-1">
                    {item.company}{" // "}{item.period}
                  </div>
                </div>

                <div
                  className={`relative z-10 w-12 h-12 bg-background border-2 ${colors.border} rounded-full flex items-center justify-center ${colors.shadow} flex-shrink-0`}
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
