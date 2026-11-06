export type ChangelogEntry = {
  version: string;
  title: string;
  notes: string[];
};

// Keep in sync with the version table in README.md.
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v4.2.0",
    title: "New projects + site cleanup",
    notes: [
      "Added seven projects, including BetterPuertoPrincesa, BetterAborlan and ICWPS",
      "Added more accounts to Links",
      "Reworked the layout for phones and tablets",
      "Fixed icon sizes, the nav highlight, the hero layout and the mobile timeline",
      "Improved text contrast, keyboard access and link previews",
      "Removed the CMS and the leftover game assets",
    ],
  },
  {
    version: "v4.1.1",
    title: "Version badge + changelog",
    notes: [
      "Added the nav version badge and this changelog",
      "Renamed the nav CTA to Contact",
    ],
  },
  {
    version: "v4.1.0",
    title: "Certificates + de-gamified UI",
    notes: [
      "Added Certificates section and CMS tab",
      "Removed skill proficiency bars/levels",
      "Stripped remaining gamified/terminal styling and NEXUS branding",
    ],
  },
  {
    version: "v4.0.0",
    title: "Neo-brutalist \"on paper\" redesign",
    notes: [
      "Flat, high-contrast visual overhaul: paper background, hard offset shadows, squared corners",
      "Removed the old pixel-art game engine entirely",
    ],
  },
  {
    version: "v3.0.0",
    title: "Nexus dark CMS portfolio",
    notes: [
      "Dark glassmorphism redesign",
      "Firebase Auth + Firestore-backed CMS at /profile",
      "Cloudinary image uploads, dynamic favicon",
    ],
  },
  {
    version: "v2.0.0",
    title: "Pixel-art game portfolio",
    notes: [
      "Full rewrite on Next.js + TypeScript + HTML5 Canvas",
      "Side-scrolling game shell with sprite character, monsters, scoring",
    ],
  },
  {
    version: "v1.0.0",
    title: "Classic era",
    notes: [
      "Plain HTML/Bootstrap site with a Firestore-backed blog",
      "ParaNawen Flutter companion app attempt",
    ],
  },
];
