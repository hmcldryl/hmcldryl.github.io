import { portfolio } from "@/lib/portfolio";

type ColorKey = "primary" | "secondary" | "tertiary";

const NODE_COLORS: Record<ColorKey, { bg: string; text: string }> = {
  primary: { bg: "bg-primary", text: "text-on-primary" },
  secondary: { bg: "bg-secondary", text: "text-on-secondary" },
  tertiary: { bg: "bg-tertiary", text: "text-on-tertiary" },
};

const DEFAULT_NODE = NODE_COLORS.primary;

export function ExperienceSection() {
  const { experience } = portfolio;

  return (
    <section id="experience" className="py-16 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="mb-10" data-reveal>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-2">
            Experience
          </h2>
          <div className="w-16 h-[3px] bg-black" />
        </div>

        <div className="relative quest-line py-6">
          {experience.map((item, idx) => {
            const colors = NODE_COLORS[item.color as ColorKey] ?? DEFAULT_NODE;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={`${item.role}-${item.company}`}
                className={`relative mb-12 md:mb-10 flex flex-col md:flex-row items-center justify-between ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`md:w-5/12 text-center mb-3 md:mb-0 ${
                    isEven ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <h3 className="font-display text-base font-semibold text-on-surface">
                    {item.role}
                  </h3>
                  <div className="text-[12px] text-on-surface-variant mt-0.5">
                    {item.company} · {item.period}
                  </div>
                </div>

                <div
                  className={`relative z-10 w-9 h-9 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 ${colors.bg}`}
                >
                  <span className={`material-symbols-outlined text-[16px] ${colors.text}`}>
                    {item.icon}
                  </span>
                </div>

                <div
                  className={`md:w-5/12 text-center mt-3 md:mt-0 ${
                    isEven ? "md:text-left md:pl-8" : "md:text-right md:pr-8"
                  }`}
                >
                  <p className="text-on-surface-variant text-[13px] leading-relaxed">
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
