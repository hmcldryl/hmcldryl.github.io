import { TopNav } from "./components/portfolio/TopNav";
import { SideNav } from "./components/portfolio/SideNav";
import { HeroSection } from "./components/portfolio/HeroSection";
import { SkillsSection } from "./components/portfolio/SkillsSection";
import { ProjectsSection } from "./components/portfolio/ProjectsSection";
import { ExperienceSection } from "./components/portfolio/ExperienceSection";
import { CertificatesSection } from "./components/portfolio/CertificatesSection";
import { ContactSection } from "./components/portfolio/ContactSection";
import { LinksSection } from "./components/portfolio/LinksSection";
import { Footer } from "./components/portfolio/Footer";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-tertiary focus:text-on-tertiary focus:border-2 focus:border-black focus:px-4 focus:py-2 focus:text-[13px] focus:font-bold"
      >
        Skip to content
      </a>
      <TopNav />
      <SideNav />
      <main id="main" className="relative z-10 lg:pl-56 pt-16">
        <HeroSection />
        <div data-reveal><SkillsSection /></div>
        <div data-reveal data-delay="1"><ProjectsSection /></div>
        <div data-reveal><ExperienceSection /></div>
        <div data-reveal data-delay="1"><CertificatesSection /></div>
        <div data-reveal><LinksSection /></div>
        <div data-reveal data-delay="1"><ContactSection /></div>
        <div data-reveal data-delay="2"><Footer /></div>
      </main>
    </div>
  );
}
