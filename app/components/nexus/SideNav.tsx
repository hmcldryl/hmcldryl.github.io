const NAV_LINKS = [
  { id: "nexus", label: "Nexus", icon: "home" },
  { id: "arsenal", label: "Arsenal", icon: "swords" },
  { id: "quests", label: "Quests", icon: "task_alt" },
  { id: "experience", label: "Experience", icon: "military_tech" },
  { id: "accounts", label: "Accounts", icon: "manage_accounts" },
  { id: "connect", label: "Connect", icon: "alternate_email" },
];

export function SideNav() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 z-40 bg-surface-container-lowest/80 backdrop-blur-2xl border-r border-outline-variant/20 flex-col shadow-2xl pt-24 pb-8">
      {/* Level badge */}
      <div className="px-6 mb-8">
        <div className="p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/20">
          <div className="font-display text-3xl font-bold text-tertiary leading-none">LVL 99</div>
          <div className="font-mono text-[11px] tracking-[0.1em] text-on-surface-variant uppercase mt-1">
            EXP MAX / PALAWAN
          </div>
          <div className="w-full bg-surface-container mt-3 h-1 rounded-full overflow-hidden">
            <div className="bg-tertiary w-full h-full shadow-[0_0_10px_#e7c365]" />
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-grow space-y-1">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="text-on-surface-variant hover:bg-surface-variant/30 hover:text-primary px-6 py-3 flex items-center gap-4 transition-all cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              {link.icon}
            </span>
            <span className="font-display text-[18px] font-semibold">{link.label}</span>
          </a>
        ))}
      </nav>

      {/* CTA */}
      <div className="px-6 mt-auto">
        <a
          href="#connect"
          className="w-full bg-primary text-on-primary py-3 px-4 font-mono text-[11px] tracking-[0.1em] font-bold uppercase rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">terminal</span>
          Initialize Comms
        </a>
      </div>
    </aside>
  );
}
