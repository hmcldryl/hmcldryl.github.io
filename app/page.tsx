import { TopNav } from "./components/nexus/TopNav";
import { SideNav } from "./components/nexus/SideNav";
import { HeroSection } from "./components/nexus/HeroSection";
import { SkillsSection } from "./components/nexus/SkillsSection";
import { ProjectsSection } from "./components/nexus/ProjectsSection";
import { ExperienceSection } from "./components/nexus/ExperienceSection";
import { CertificatesSection } from "./components/nexus/CertificatesSection";
import { ConnectSection } from "./components/nexus/ConnectSection";
import { LinksSection } from "./components/nexus/LinksSection";
import { Footer } from "./components/nexus/Footer";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <TopNav />
      <SideNav />
      <main className="relative z-10 lg:pl-56 pt-16">
        <HeroSection />
        <div data-reveal><SkillsSection /></div>
        <div data-reveal data-delay="1"><ProjectsSection /></div>
        <div data-reveal><ExperienceSection /></div>
        <div data-reveal data-delay="1"><CertificatesSection /></div>
        <div data-reveal><LinksSection /></div>
        <div data-reveal data-delay="1"><ConnectSection /></div>
        <div data-reveal data-delay="2"><Footer /></div>
      </main>
    </div>
  );
}
