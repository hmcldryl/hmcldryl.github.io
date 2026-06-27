import { TopNav } from "./components/nexus/TopNav";
import { SideNav } from "./components/nexus/SideNav";
import { HeroSection } from "./components/nexus/HeroSection";
import { ArsenalSection } from "./components/nexus/ArsenalSection";
import { QuestSection } from "./components/nexus/QuestSection";
import { ExperienceSection } from "./components/nexus/ExperienceSection";
import { ConnectSection } from "./components/nexus/ConnectSection";
import { AccountLinksSection } from "./components/nexus/AccountLinksSection";
import { Footer } from "./components/nexus/Footer";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <TopNav />
      <SideNav />
      <main className="relative z-10 lg:pl-64 pt-20">
        <HeroSection />
        <div data-reveal><ArsenalSection /></div>
        <div data-reveal data-delay="1"><QuestSection /></div>
        <div data-reveal><ExperienceSection /></div>
        <div data-reveal data-delay="1"><AccountLinksSection /></div>
        <div data-reveal><ConnectSection /></div>
        <div data-reveal data-delay="2"><Footer /></div>
      </main>
    </div>
  );
}
