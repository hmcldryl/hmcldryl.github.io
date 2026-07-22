import { portfolio } from "@/lib/portfolio";

const COLOR_MAP = {
  primary: { bg: "bg-primary", text: "text-on-primary" },
  secondary: { bg: "bg-secondary", text: "text-on-secondary" },
  tertiary: { bg: "bg-tertiary", text: "text-on-tertiary" },
} as const;

type ColorKey = keyof typeof COLOR_MAP;

export function LinksSection() {
  const { accountLinks } = portfolio;

  if (!accountLinks?.length) return null;

  return (
    <section id="links" className="py-16 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="mb-10" data-reveal>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-2">
            Links
          </h2>
          <div className="w-16 h-[3px] bg-black" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {accountLinks.map((link, i) => {
            const colors = COLOR_MAP[(link.color as ColorKey) ?? "primary"] ?? COLOR_MAP.primary;
            const Card = (
              <div className="brutal-press brutal-panel p-4 flex items-center gap-3 group">
                <div className={`w-9 h-9 flex items-center justify-center border-2 border-black shrink-0 ${colors.bg} ${colors.text}`}>
                  <span className="material-symbols-outlined text-[18px]">
                    {link.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-on-surface-variant mb-0.5">
                    {link.platform}
                  </div>
                  <div className="font-display font-semibold text-on-surface text-[13px] truncate">
                    {link.handle}
                  </div>
                </div>
                {link.url && (
                  <span className="material-symbols-outlined text-[14px] ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-on-surface">
                    arrow_outward
                  </span>
                )}
              </div>
            );

            return link.url ? (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {Card}
              </a>
            ) : (
              <div key={i}>{Card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
