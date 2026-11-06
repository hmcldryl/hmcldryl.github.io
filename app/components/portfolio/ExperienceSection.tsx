import { portfolio } from "@/lib/portfolio";
import { accentClass } from "./accent";
import { SectionHeading } from "./SectionHeading";

const lineCls = "absolute left-4 xl:left-1/2 w-1 bg-black xl:-translate-x-1/2";

// Below xl the timeline is a left rail: alternating columns get too narrow
// once the page margins and sidebar are taken out, and a centered line would
// run through the text.
//
// Each item draws the line into and out of its own icon, so it starts at the
// first icon and stops at the last. The icon sits 18px down on the rail and at
// the item's middle from xl up; -bottom-10 reaches across the item's mb-10.
export function ExperienceSection() {
  const { experience } = portfolio;

  return (
    <section id="experience" className="py-16 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <SectionHeading title="Experience" />

        <ol>
          {experience.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <li
                key={`${item.role}-${item.company}`}
                className={`relative mb-10 last:mb-0 pl-14 xl:pl-0 xl:flex xl:items-center xl:justify-between ${
                  isEven ? "" : "xl:flex-row-reverse"
                }`}
              >
                {idx > 0 && (
                  <div aria-hidden="true" className={`${lineCls} top-0 h-[18px] xl:h-1/2`} />
                )}
                {idx < experience.length - 1 && (
                  <div aria-hidden="true" className={`${lineCls} top-[18px] xl:top-1/2 -bottom-10`} />
                )}

                <div
                  className={`xl:w-5/12 mb-2 xl:mb-0 ${
                    isEven ? "xl:text-right xl:pr-8" : "xl:text-left xl:pl-8"
                  }`}
                >
                  <h3 className="font-display text-base font-semibold text-on-surface">
                    {item.role}
                  </h3>
                  <div className="text-[13px] text-on-surface-variant mt-0.5">
                    {item.company} · {item.period}
                  </div>
                </div>

                <div
                  className={`absolute left-0 top-0 xl:static z-10 w-9 h-9 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 ${accentClass(item.color)}`}
                >
                  <span className="icon text-[16px]">{item.icon}</span>
                </div>

                <div
                  className={`xl:w-5/12 ${
                    isEven ? "xl:text-left xl:pl-8" : "xl:text-right xl:pr-8"
                  }`}
                >
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
