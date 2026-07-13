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

export function SkillsSection() {
  const { skills } = usePortfolio();

  return (
    <section id="skills" className="py-16 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="mb-10" data-reveal>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-2">
            Skills
          </h2>
          <div className="w-16 h-[3px] bg-black" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, idx) => {
            const colors = COLOR_MAP[skill.color as ColorKey] ?? DEFAULT_COLOR;
            return (
              <div
                key={skill.name}
                data-reveal
                data-delay={String((idx % 3) + 1)}
                className="brutal-press brutal-panel p-5"
              >
                <div className="mb-4 flex justify-between items-start">
                  <div className={`p-2 border-2 border-black ${colors.bg} ${colors.text}`}>
                    <span className="material-symbols-outlined text-2xl">{skill.icon}</span>
                  </div>
                  <span className="text-[12px] font-bold text-on-surface">
                    {skill.level}%
                  </span>
                </div>

                <h3 className="font-display text-base font-semibold text-on-surface mb-1">
                  {skill.name}
                </h3>
                <p className="text-on-surface-variant text-[13px] mb-4 leading-relaxed">
                  {skill.description}
                </p>

                <div className="h-[8px] w-full bg-surface border-2 border-black overflow-hidden">
                  <div
                    className={`skill-bar-fill h-full ${colors.bar}`}
                    style={{ "--bar-level": `${skill.level}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
