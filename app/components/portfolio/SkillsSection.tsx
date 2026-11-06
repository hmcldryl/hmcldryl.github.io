import { portfolio } from "@/lib/portfolio";
import { accentClass } from "./accent";
import { SectionHeading } from "./SectionHeading";

export function SkillsSection() {
  const { skills } = portfolio;

  return (
    <section id="skills" className="py-16 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <SectionHeading title="Skills" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill.name} className="brutal-panel p-5">
              <div className={`mb-4 inline-flex p-2 border-2 border-black ${accentClass(skill.color)}`}>
                <span className="icon text-[24px]">{skill.icon}</span>
              </div>

              <h3 className="font-display text-base font-semibold text-on-surface mb-1">
                {skill.name}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
