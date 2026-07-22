import { portfolio } from "@/lib/portfolio";

type ColorKey = "primary" | "secondary" | "tertiary";

const COLOR_MAP: Record<ColorKey, { bg: string; text: string }> = {
  primary: { bg: "bg-primary", text: "text-on-primary" },
  secondary: { bg: "bg-secondary", text: "text-on-secondary" },
  tertiary: { bg: "bg-tertiary", text: "text-on-tertiary" },
};

const DEFAULT_COLOR = COLOR_MAP.primary;

export function SkillsSection() {
  const { skills } = portfolio;

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
                <div className={`mb-4 inline-flex p-2 border-2 border-black ${colors.bg} ${colors.text}`}>
                  <span className="material-symbols-outlined text-2xl">{skill.icon}</span>
                </div>

                <h3 className="font-display text-base font-semibold text-on-surface mb-1">
                  {skill.name}
                </h3>
                <p className="text-on-surface-variant text-[13px] leading-relaxed">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
