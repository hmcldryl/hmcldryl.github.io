import { portfolio } from "@/lib/portfolio";

const ALL_LINKS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "skills", label: "Skills", icon: "auto_awesome" },
  { id: "projects", label: "Projects", icon: "grid_view" },
  { id: "experience", label: "Experience", icon: "work" },
  { id: "certificates", label: "Certificates", icon: "workspace_premium" },
  { id: "links", label: "Links", icon: "link" },
];

// These sections render nothing when their data is empty, so a nav link to
// them would go nowhere.
const EMPTY_SECTIONS = new Set([
  ...(portfolio.certificates.length ? [] : ["certificates"]),
  ...(portfolio.accountLinks.length ? [] : ["links"]),
]);

export const NAV_LINKS = ALL_LINKS.filter((link) => !EMPTY_SECTIONS.has(link.id));

// Contact isn't a nav link (it's a standalone CTA), but scroll-spy still has
// to track it, otherwise the last nav link stays highlighted through Contact
// and the footer.
export const SECTION_IDS = [...NAV_LINKS.map((link) => link.id), "contact"];
