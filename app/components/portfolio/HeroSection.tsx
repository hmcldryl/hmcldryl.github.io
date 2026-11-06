import Image from "next/image";
import { portfolio } from "@/lib/portfolio";

export function HeroSection() {
  const { personalInfo } = portfolio;

  return (
    <section id="home" className="relative min-h-[85svh] flex items-center px-5 md:px-10 xl:px-margin-desktop py-12 md:py-16 overflow-hidden">
      <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 sm:grid-cols-12 gap-gutter items-center">
        {/* Left: intro */}
        <div className="sm:col-span-7 space-y-5">
          <h1 className="font-display font-bold text-on-surface text-4xl md:text-5xl leading-tight text-balance">
            {personalInfo.name}
          </h1>

          {personalInfo.tagline && (
            <p className="text-primary-ink font-semibold text-base md:text-lg">
              {personalInfo.tagline}
            </p>
          )}

          <p className="font-body text-base text-on-surface-variant max-w-xl leading-relaxed">
            {personalInfo.bio}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#projects"
              className="brutal-press-sm bg-primary text-on-primary text-[13px] font-bold py-3 px-6 border-2 border-black shadow-brutal-sm"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="brutal-press-sm bg-surface border-2 border-black text-on-surface text-[13px] font-bold py-3 px-6 shadow-brutal-sm"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Right: photo */}
        <div className="sm:col-span-5 flex justify-center">
          {/* The photo is a chest-up cutout, so the frame's bottom edge hides where it ends. */}
          <div className="w-full max-w-[320px] aspect-square overflow-hidden bg-tertiary border-[3px] border-black shadow-brutal flex items-center justify-center">
            {personalInfo.photoUrl ? (
              <Image
                src={personalInfo.photoUrl}
                alt={personalInfo.name}
                width={500}
                height={500}
                priority
                className="w-full h-full object-cover object-bottom select-none"
              />
            ) : (
              <span className="icon text-[64px] text-on-tertiary/30">person</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
