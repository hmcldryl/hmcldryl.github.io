import { portfolio } from "@/lib/portfolio";
import { accentClass } from "./accent";
import { SectionHeading } from "./SectionHeading";

export function LinksSection() {
  const { accountLinks } = portfolio;

  if (!accountLinks?.length) return null;

  return (
    <section id="links" className="py-12 md:py-16 px-5 md:px-10 xl:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <SectionHeading title="Links" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {accountLinks.map((link, i) => {
            const Card = (
              <div className={`${link.url ? "brutal-press" : ""} brutal-panel p-4 flex items-center gap-3 group`}>
                <div className={`w-9 h-9 flex items-center justify-center border-2 border-black shrink-0 ${accentClass(link.color)}`}>
                  <span className="icon text-[18px]">
                    {link.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] text-on-surface-variant mb-0.5">
                    {link.platform}
                  </div>
                  <div className="font-display font-semibold text-on-surface text-[13px] truncate">
                    {link.handle}
                  </div>
                </div>
                {link.url && (
                  <span className="icon text-[14px] ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-on-surface">
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
