"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";
import type { Project } from "@/lib/firestore";

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

const COL_SPAN: Record<string, string> = {
  big:   "md:col-span-8",
  small: "md:col-span-4",
  wide:  "md:col-span-12",
  other: "md:col-span-6",
};

const MIN_H: Record<string, string> = {
  big:   "min-h-[400px]",
  small: "min-h-[400px]",
  wide:  "min-h-[260px]",
  other: "min-h-[300px]",
};

function Tag({ label }: { label: string }) {
  const cls = TAG_COLORS[label] ?? "bg-surface-variant/50 text-on-surface border-outline/30";
  return (
    <span className={`text-[10px] font-bold py-1 px-3 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const colSpan = COL_SPAN[project.size] ?? "md:col-span-6";
  const minH    = MIN_H[project.size]    ?? "min-h-[300px]";

  return (
    <div className={`${colSpan} group relative overflow-hidden rounded-xl border border-outline-variant/30 ${minH}`}>
      {/* Background */}
      {project.imageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute inset-0 glass-panel" />
        </>
      )}

      {/* Content */}
      <div className={`relative z-10 h-full p-8 flex flex-col justify-end ${minH}`}>
        <div className="flex gap-2 mb-4 flex-wrap">
          {project.tags.map((t, i) => <Tag key={`${t}-${i}`} label={t} />)}
        </div>
        <h3 className={`font-display font-semibold text-on-surface mb-2 ${project.size === "wide" ? "text-3xl md:text-4xl font-bold" : project.size === "big" ? "text-2xl" : "text-xl"}`}>
          {project.name}
        </h3>
        <p className={`text-on-surface-variant text-sm leading-relaxed mb-6 ${project.size === "wide" ? "text-base max-w-2xl" : project.size === "big" ? "max-w-lg" : ""}`}>
          {project.description}
        </p>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary font-mono text-[11px] tracking-[0.1em] font-bold uppercase group-hover:translate-x-2 transition-transform w-fit"
          >
            VIEW_PROJECT <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
          </a>
        ) : (
          <div className="flex items-center gap-2 text-primary font-mono text-[11px] tracking-[0.1em] font-bold uppercase">
            IN_PROGRESS <span className="material-symbols-outlined text-[18px]">military_tech</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function QuestSection() {
  const { projects } = usePortfolio();

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
          {projects.map((project, i) => (
            <ProjectCard key={`${i}-${project.name}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
