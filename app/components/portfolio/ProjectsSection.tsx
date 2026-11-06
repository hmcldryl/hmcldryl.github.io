import { portfolio, type Project } from "@/lib/portfolio";
import { accentClass } from "./accent";
import { SectionHeading } from "./SectionHeading";

const COL_SPAN: Record<string, string> = {
  big:   "md:col-span-8",
  small: "md:col-span-4",
  wide:  "md:col-span-12",
  other: "md:col-span-6",
};

function Tag({ label, accent }: { label: string; accent: string }) {
  const cls = label === "ARCHIVED" ? "bg-black text-background" : accent;
  return (
    <span className={`text-[11px] font-bold py-0.5 px-2 border border-black ${cls}`}>
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const colSpan = COL_SPAN[project.size] ?? COL_SPAN.other;
  const accent = accentClass(project.accentColor);

  return (
    <div className={`${colSpan} ${project.link ? "brutal-press" : ""} brutal-panel relative p-6 flex flex-col`}>
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {project.tags.map((t, i) => <Tag key={`${t}-${i}`} label={t} accent={accent} />)}
      </div>
      <h3 className="font-display font-semibold text-on-surface mb-1.5 text-lg">
        {project.name}
      </h3>
      <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
        {project.description}
      </p>
      {project.link ? (
        // after:inset-0 stretches the link's hit area over the whole card.
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View project: ${project.name}`}
          className="flex items-center gap-1 text-primary-ink text-[13px] font-bold mt-auto w-fit after:absolute after:inset-0"
        >
          View Project <span className="icon text-[16px]">arrow_right_alt</span>
        </a>
      ) : (
        <div className="flex items-center gap-1 text-on-surface-variant text-[13px] font-bold mt-auto">
          In Progress
        </div>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const { projects } = portfolio;

  return (
    <section id="projects" className="py-16 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <SectionHeading title="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={`${i}-${project.name}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
