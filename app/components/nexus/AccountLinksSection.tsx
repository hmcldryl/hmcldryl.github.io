"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

const COLOR_MAP = {
  primary: { bg: "bg-primary", text: "text-on-primary" },
  secondary: { bg: "bg-secondary", text: "text-on-secondary" },
  tertiary: { bg: "bg-tertiary", text: "text-on-tertiary" },
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
          <div className="w-24 h-[4px] bg-black" />
          <p className="text-on-surface-variant font-body mt-4 text-sm">
            Find me across platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {accountLinks.map((link, i) => {
            const colors = COLOR_MAP[(link.color as ColorKey) ?? "primary"] ?? COLOR_MAP.primary;
            const Card = (
              <div className="brutal-press brutal-panel p-6 flex items-center gap-4 group">
                <div className={`w-12 h-12 flex items-center justify-center border-2 border-black shrink-0 ${colors.bg} ${colors.text}`}>
                  <span className="material-symbols-outlined text-[22px]">
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
                  <span className="material-symbols-outlined text-[16px] ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-on-surface">
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
