"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

type ColorKey = "primary" | "secondary" | "tertiary";

const COLOR_MAP: Record<ColorKey, { bg: string; text: string; bar: string }> = {
  primary: {
    bg: "bg-primary",
    text: "text-on-primary",
    bar: "bg-primary",
  },
  secondary: {
    bg: "bg-secondary",
    text: "text-on-secondary",
    bar: "bg-secondary",
  },
  tertiary: {
    bg: "bg-tertiary",
    text: "text-on-tertiary",
    bar: "bg-tertiary",
  },
};

const DEFAULT_COLOR = COLOR_MAP.primary;

export function ArsenalSection() {
  const { skills } = usePortfolio();

  return (
    <section id="arsenal" className="py-24 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="mb-16" data-reveal>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-3">
            Technical Arsenal
          </h2>
          <div className="w-24 h-[4px] bg-black" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {skills.map((skill, idx) => {
            const colors = COLOR_MAP[skill.color as ColorKey] ?? DEFAULT_COLOR;
            const levelLabel = Math.round(skill.level / 10) * 10;
            return (
              <div
                key={skill.name}
                data-reveal
                data-delay={String((idx % 3) + 1)}
                className="brutal-press brutal-panel p-8"
              >
                <div className="mb-6 flex justify-between items-start">
                  <div className={`p-3 border-2 border-black ${colors.bg} ${colors.text}`}>
                    <span className="material-symbols-outlined text-4xl">{skill.icon}</span>
                  </div>
                  <span className="font-mono text-[12px] font-bold tracking-[0.05em] text-on-surface">
                    Lvl. {levelLabel}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-on-surface mb-2">
                  {skill.name}
                </h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  {skill.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[11px] font-bold tracking-[0.05em] text-on-surface">
                    <span>PROFICIENCY</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-[10px] w-full bg-surface border-2 border-black overflow-hidden">
                    <div
                      className={`skill-bar-fill h-full ${colors.bar}`}
                      style={{ "--bar-level": `${skill.level}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
