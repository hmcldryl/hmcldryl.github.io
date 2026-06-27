"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

const TAG_COLORS: Record<string, string> = {
  IoT: "bg-primary/20 text-primary border-primary/30",
  Embedded: "bg-tertiary/20 text-tertiary border-tertiary/30",
  Mobile: "bg-primary/20 text-primary border-primary/30",
  Flutter: "bg-secondary/20 text-secondary border-secondary/30",
  "Java Android": "bg-tertiary/20 text-tertiary border-tertiary/30",
  Web: "bg-secondary/20 text-secondary border-secondary/30",
  TypeScript: "bg-secondary/20 text-secondary border-secondary/30",
  Enterprise: "bg-surface-variant/50 text-on-surface border-outline/30",
  "3D Print": "bg-tertiary/20 text-tertiary border-tertiary/30",
};

function Tag({ label }: { label: string }) {
  const cls = TAG_COLORS[label] ?? "bg-surface-variant/50 text-on-surface border-outline/30";
  return (
    <span className={`text-[10px] font-bold py-1 px-3 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

function CardBg({ imageUrl }: { imageUrl?: string | null }) {
  if (imageUrl) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      </>
    );
  }
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 glass-panel" />
    </>
  );
}

export function QuestSection() {
  const { projects } = usePortfolio();

  const big   = projects.find((p) => p.size === "big");
  const small = projects.find((p) => p.size === "small");
  const wide  = projects.find((p) => p.size === "wide");
  const rest  = projects.filter((p) => !["big", "small", "wide"].includes(p.size));

  return (
    <section id="quests" className="py-24 px-5 md:px-margin-desktop bg-surface/30">
      <div className="max-w-container-max mx-auto">
        <div className="mb-16 flex justify-between items-end flex-wrap gap-4">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-3">
              Quest Log
            </h2>
            <div className="w-24 h-[2px] bg-primary" />
          </div>
          <div className="hidden md:block font-mono text-[12px] tracking-[0.05em] text-on-surface-variant">
            ACTIVE_PROJECTS: {projects.length.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Big card */}
          {big && (
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl border border-outline-variant/30 min-h-[400px]">
              <CardBg imageUrl={big.imageUrl} />
              <div className="relative z-10 h-full p-8 flex flex-col justify-end min-h-[400px]">
                {!big.imageUrl && (
                  <div className="absolute top-6 right-6 opacity-10">
                    <span className="material-symbols-outlined text-[80px] text-primary">memory</span>
                  </div>
                )}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {big.tags.map((t, i) => <Tag key={`${t}-${i}`} label={t} />)}
                </div>
                <h3 className="font-display text-2xl font-semibold text-on-surface mb-2">{big.name}</h3>
                <p className="text-on-surface-variant text-sm mb-6 max-w-lg leading-relaxed">{big.description}</p>
                {big.link ? (
                  <a href={big.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary font-mono text-[11px] tracking-[0.1em] font-bold uppercase group-hover:translate-x-2 transition-transform">
                    VIEW_PROJECT <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 text-primary font-mono text-[11px] tracking-[0.1em] font-bold uppercase">
                    AWARD_WINNING_BUILD <span className="material-symbols-outlined text-[18px]">military_tech</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Small card */}
          {small && (
            <div className="md:col-span-4 group relative overflow-hidden rounded-xl border border-outline-variant/30 min-h-[400px]">
              <CardBg imageUrl={small.imageUrl} />
              <div className="relative z-10 h-full p-8 flex flex-col justify-end min-h-[400px]">
                {!small.imageUrl && (
                  <div className="absolute top-6 right-6 opacity-10">
                    <span className="material-symbols-outlined text-[80px] text-tertiary">smartphone</span>
                  </div>
                )}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {small.tags.map((t, i) => <Tag key={`${t}-${i}`} label={t} />)}
                </div>
                <h3 className="font-display text-xl font-semibold text-on-surface mb-2">{small.name}</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{small.description}</p>
                {small.link ? (
                  <a href={small.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-tertiary font-mono text-[11px] tracking-[0.1em] font-bold uppercase">
                    VIEW_PROJECT <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 text-tertiary font-mono text-[11px] tracking-[0.1em] font-bold uppercase">
                    MOBILE_APP <span className="material-symbols-outlined text-[18px]">smartphone</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Wide card */}
          {wide && (
            <div className="md:col-span-12 group relative overflow-hidden rounded-xl border border-outline-variant/30 min-h-[260px]">
              <CardBg imageUrl={wide.imageUrl} />
              <div className="relative z-10 h-full p-10 flex flex-col justify-center min-h-[260px]">
                {!wide.imageUrl && (
                  <div className="absolute top-8 right-8 opacity-10">
                    <span className="material-symbols-outlined text-[100px] text-secondary">terminal</span>
                  </div>
                )}
                <div className="max-w-2xl">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {wide.tags.map((t, i) => <Tag key={`${t}-${i}`} label={t} />)}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-4">{wide.name}</h3>
                  <p className="text-on-surface-variant text-base mb-8 leading-relaxed">{wide.description}</p>
                  {wide.link ? (
                    <a href={wide.link} target="_blank" rel="noopener noreferrer"
                      className="bg-white text-black py-3 px-8 rounded-lg font-mono text-[11px] tracking-[0.1em] font-bold uppercase hover:bg-primary transition-all inline-block">
                      LAUNCH_APPLICATION
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-secondary font-mono text-[11px] tracking-[0.1em] font-bold uppercase group-hover:translate-x-2 transition-transform">
                      ENTERPRISE_SYSTEM <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Additional cards */}
          {rest.map((project) => (
            <div key={project.name} className="md:col-span-6 group relative overflow-hidden rounded-xl border border-outline-variant/30 min-h-[300px]">
              <CardBg imageUrl={project.imageUrl} />
              <div className="relative z-10 h-full p-8 flex flex-col justify-end min-h-[300px]">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tags.map((t, i) => <Tag key={`${t}-${i}`} label={t} />)}
                </div>
                <h3 className="font-display text-xl font-semibold text-on-surface mb-2">{project.name}</h3>
                <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary font-mono text-[11px] tracking-[0.1em] font-bold uppercase">
                    VIEW_PROJECT <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
