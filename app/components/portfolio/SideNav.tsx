"use client";

const NAV_LINKS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "skills", label: "Skills", icon: "auto_awesome" },
  { id: "projects", label: "Projects", icon: "grid_view" },
  { id: "experience", label: "Experience", icon: "work" },
  { id: "certificates", label: "Certificates", icon: "workspace_premium" },
  { id: "links", label: "Links", icon: "link" },
];

export function SideNav() {
  return (
    <aside className="sidebar-entrance hidden lg:flex fixed left-0 top-0 h-full w-56 z-40 bg-surface border-r-4 border-black flex-col pt-24 pb-8">
      {/* Nav links */}
      <nav className="flex-grow space-y-1 px-3">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="text-on-surface hover:bg-black hover:text-background px-3 py-2.5 flex items-center gap-3 transition-colors duration-150 cursor-pointer border-2 border-transparent hover:border-black"
          >
            <span className="material-symbols-outlined text-[18px]">
              {link.icon}
            </span>
            <span className="text-[14px] font-medium">
              {link.label}
            </span>
          </a>
        ))}
      </nav>

      {/* CTA */}
      <div className="px-6 mt-auto">
        <a
          href="#connect"
          className="brutal-press w-full bg-primary text-on-primary py-2.5 px-4 text-[13px] font-bold border-2 border-black shadow-brutal-sm transition-all flex items-center justify-center gap-2"
        >
          Contact
        </a>
      </div>
    </aside>
  );
}
