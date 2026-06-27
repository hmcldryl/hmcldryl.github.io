"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

const COLOR_MAP = {
  primary: {
    border: "border-primary/20 hover:border-primary/60",
    icon: "text-primary",
    glow: "hover:shadow-[0_0_20px_rgba(207,188,255,0.1)]",
    badge: "bg-primary/10 text-primary",
  },
  secondary: {
    border: "border-secondary/20 hover:border-secondary/60",
    icon: "text-secondary",
    glow: "hover:shadow-[0_0_20px_rgba(205,192,233,0.1)]",
    badge: "bg-secondary/10 text-secondary",
  },
  tertiary: {
    border: "border-tertiary/20 hover:border-tertiary/60",
    icon: "text-tertiary",
    glow: "hover:shadow-[0_0_20px_rgba(231,195,101,0.1)]",
    badge: "bg-tertiary/10 text-tertiary",
  },
} as const;

type ColorKey = keyof typeof COLOR_MAP;

export function AccountLinksSection() {
  const { accountLinks } = usePortfolio();

  if (!accountLinks?.length) return null;

  return (
    <section id="accounts" className="py-24 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-3">
            Accounts
          </h2>
          <div className="w-24 h-[2px] bg-secondary" />
          <p className="text-on-surface-variant font-body mt-4 text-sm">
            Find me across platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {accountLinks.map((link, i) => {
            const colors = COLOR_MAP[(link.color as ColorKey) ?? "primary"] ?? COLOR_MAP.primary;
            const Card = (
              <div
                className={`glass-panel rounded-xl p-6 border transition-all duration-200 group ${colors.border} ${colors.glow} flex items-center gap-4`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.badge} shrink-0`}>
                  <span className={`material-symbols-outlined text-[22px] ${colors.icon}`}>
                    {link.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-on-surface-variant mb-1">
                    {link.platform}
                  </div>
                  <div className="font-display font-semibold text-on-surface text-sm truncate">
                    {link.handle}
                  </div>
                </div>
                {link.url && (
                  <span className={`material-symbols-outlined text-[16px] ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${colors.icon}`}>
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
