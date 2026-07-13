"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";
import type { Project } from "@/lib/firestore";

const TAG_COLORS: Record<string, string> = {
  IoT: "bg-primary text-on-primary",
  Embedded: "bg-tertiary text-on-tertiary",
  Mobile: "bg-primary text-on-primary",
  Flutter: "bg-secondary text-on-secondary",
  "Java Android": "bg-tertiary text-on-tertiary",
  Web: "bg-secondary text-on-secondary",
  TypeScript: "bg-secondary text-on-secondary",
  Enterprise: "bg-surface text-on-surface",
  "3D Print": "bg-tertiary text-on-tertiary",
};

const COL_SPAN: Record<string, string> = {
  big:   "md:col-span-8",
  small: "md:col-span-4",
  wide:  "md:col-span-12",
  other: "md:col-span-6",
};

function Tag({ label }: { label: string }) {
  const cls = TAG_COLORS[label] ?? "bg-surface text-on-surface";
  return (
    <span className={`text-[9px] font-bold py-0.5 px-2 border border-black ${cls}`}>
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const colSpan = COL_SPAN[project.size] ?? "md:col-span-6";

  return (
    <div className={`${colSpan} brutal-press brutal-panel p-6 flex flex-col`}>
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {project.tags.map((t, i) => <Tag key={`${t}-${i}`} label={t} />)}
      </div>
      <h3 className="font-display font-semibold text-on-surface mb-1.5 text-lg">
        {project.name}
      </h3>
      <p className="text-on-surface-variant text-[13px] leading-relaxed mb-4">
        {project.description}
      </p>
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary text-[12px] font-bold mt-auto w-fit"
        >
          View Project <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
        </a>
      ) : (
        <div className="flex items-center gap-1 text-on-surface-variant text-[12px] font-bold mt-auto">
          In Progress
        </div>
      )}
    </div>
  );
}

export function QuestSection() {
  const { projects } = usePortfolio();

  return (
    <section id="projects" className="py-16 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="mb-10" data-reveal>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-2">
            Projects
          </h2>
          <div className="w-16 h-[3px] bg-black" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={`${i}-${project.name}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
