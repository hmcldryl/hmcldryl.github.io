"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { uploadProfilePhoto } from "@/lib/storage";
import {
  getPortfolioData,
  setPortfolioData,
  type PortfolioData,
  type Skill,
  type Project,
  type Experience,
  type Certificate,
  type AccountLink,
} from "@/lib/firestore";

type Tab = "info" | "skills" | "projects" | "experience" | "certificates" | "accounts";

const AUTO_COLORS = ["primary", "secondary", "tertiary"] as const;

// ─── Field helpers ───────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-primary block">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-surface-container border-2 border-black p-3 text-on-surface font-body text-sm transition-shadow outline-none placeholder:text-on-surface-variant/40";

const SIZE_INFO = {
  big:   { cols: "8/12", desc: "Large feature card (left side)" },
  small: { cols: "4/12", desc: "Compact card (right side)" },
  wide:  { cols: "12/12", desc: "Full-width banner card" },
  other: { cols: "6/12", desc: "Half-width card (extras)" },
} as const;

function SizeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(SIZE_INFO) as Array<keyof typeof SIZE_INFO>).map((key) => {
          const { cols } = SIZE_INFO[key];
          const active = value === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`flex items-center gap-2 px-3 py-2 border-2 font-mono text-[11px] font-bold transition-colors ${
                active
                  ? "border-black bg-primary text-on-primary"
                  : "border-black/30 text-on-surface-variant hover:border-black"
              }`}
            >
              {key}
              <span className="text-[10px] opacity-60">{cols}</span>
            </button>
          );
        })}
      </div>
      {value in SIZE_INFO && (
        <p className="font-mono text-[10px] text-on-surface-variant/60">
          {SIZE_INFO[value as keyof typeof SIZE_INFO].desc}
        </p>
      )}
    </div>
  );
}

const ALL_ICONS: Record<string, string[]> = {
  "Dev / Code": ["code", "terminal", "bug_report", "data_object", "integration_instructions", "api", "deployed_code", "build", "construction", "developer_mode", "css", "html", "javascript", "schema", "commit", "merge", "fork_right", "account_tree", "device_hub", "lan"],
  "Cloud / Infra": ["cloud", "cloud_upload", "cloud_download", "cloud_sync", "cloud_done", "storage", "database", "dns", "hub", "router", "memory", "developer_board", "computer", "monitor", "server_person", "backup", "sync", "security", "lock", "key"],
  "Mobile / Hardware": ["smartphone", "tablet", "android", "phone_iphone", "watch", "headphones", "speaker", "camera", "sensors", "bluetooth", "wifi", "signal_cellular_alt", "battery_full", "usb", "cable", "microchip", "circuit_board", "precision_manufacturing", "settings_remote", "device_thermostat"],
  "AI / Data": ["psychology", "neurology", "scatter_plot", "bar_chart", "analytics", "insights", "query_stats", "auto_awesome", "smart_toy", "robot_2", "model_training", "dataset", "table_chart", "pivot_table_chart", "network_intelligence", "ssid_chart", "show_chart", "trending_up", "functions", "calculate"],
  "Design / UI": ["palette", "brush", "format_paint", "draw", "design_services", "auto_fix_high", "wallpaper", "gradient", "blur_on", "layers", "grid_view", "view_quilt", "space_dashboard", "dashboard", "widgets", "crop", "image", "photo_camera", "photo_filter", "style"],
  "Work / Business": ["work", "business_center", "corporate_fare", "domain", "apartment", "handshake", "groups", "manage_accounts", "badge", "assignment", "task_alt", "checklist", "fact_check", "approval", "contract", "description", "note_alt", "article", "summarize", "inventory"],
  "Learning / Growth": ["school", "menu_book", "auto_stories", "import_contacts", "bookmark", "lightbulb", "emoji_objects", "science", "biotech", "lab_profile", "experiment", "explore", "travel_explore", "trophy", "military_tech", "workspace_premium", "star", "grade", "new_releases", "rocket_launch"],
  "Gaming / Hobbies": ["sports_esports", "videogame_asset", "joystick", "swords", "shield", "castle", "catching_pokemon", "pokemon_go", "puzzle_piece", "casino", "dice_6", "chess", "sports_motorsports", "sports", "fitness_center", "hiking", "camping", "surfing", "skateboarding", "music_note"],
  "Social / Connect": ["person", "group", "people", "alternate_email", "mail", "chat", "forum", "comment", "message", "sms", "call", "video_call", "share", "link", "public", "language", "location_on", "map", "place", "near_me"],
  "Media / Content": ["play_circle", "video_library", "movie", "live_tv", "podcast", "radio", "headset_mic", "mic", "record_voice_over", "campaign", "newspaper", "feed", "rss_feed", "subscriptions", "thumb_up", "favorite", "bookmark_add", "collections", "photo_library", "gallery_thumbnail"],
  "Tools / Settings": ["settings", "tune", "build_circle", "home_repair_service", "plumbing", "electrical_services", "handyman", "engineering", "architecture", "straighten", "square_foot", "compress", "expand", "filter_list", "sort", "search", "find_replace", "manage_search", "troubleshoot", "tips_and_updates"],
};

const ALL_ICONS_FLAT = Object.values(ALL_ICONS).flat();

function IconReference({ onPick }: { onPick: (icon: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? ALL_ICONS_FLAT.filter((icon) => icon.includes(query.trim().toLowerCase().replace(/\s+/g, "_")))
    : null;

  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="font-mono text-[10px] text-on-surface-variant/60 hover:text-primary transition-colors flex items-center gap-1"
      >
        <span className="material-symbols-outlined text-[13px]">{open ? "expand_less" : "expand_more"}</span>
        {open ? "hide icon picker" : "browse icons"}
      </button>
      {open && (
        <div className="mt-2 brutal-panel p-4 space-y-3">
          {/* Search */}
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search icons…"
            className="w-full bg-surface-container border-2 border-black px-3 py-2 text-on-surface font-mono text-[12px] outline-none placeholder:text-on-surface-variant/40 transition-shadow"
          />

          {results ? (
            /* Search results */
            <div>
              <div className="font-mono text-[10px] text-on-surface-variant/50 mb-2 uppercase tracking-[0.08em]">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </div>
              {results.length > 0 ? (
                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                  {results.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      title={icon}
                      onClick={() => { onPick(icon); setOpen(false); setQuery(""); }}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-primary text-on-surface-variant transition-all border border-transparent hover:border-primary/30"
                    >
                      <span className="material-symbols-outlined text-[20px]">{icon}</span>
                      <span className="font-mono text-[9px] opacity-60 max-w-[60px] truncate">{icon}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="font-mono text-[11px] text-on-surface-variant/40">No icons found. Try a different term.</p>
              )}
            </div>
          ) : (
            /* Browse by category */
            Object.entries(ALL_ICONS).map(([label, icons]) => (
              <div key={label}>
                <div className="font-mono text-[10px] text-on-surface-variant/50 mb-2 uppercase tracking-[0.08em]">{label}</div>
                <div className="flex flex-wrap gap-2">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      title={icon}
                      onClick={() => { onPick(icon); setOpen(false); }}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-primary text-on-surface-variant transition-all border border-transparent hover:border-primary/30"
                    >
                      <span className="material-symbols-outlined text-[20px]">{icon}</span>
                      <span className="font-mono text-[9px] opacity-60 max-w-[60px] truncate">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── Skill row ────────────────────────────────────────────────────────────────

function SkillRow({ skill, idx, total, onChange, onMove, onDelete }: {
  skill: Skill; idx: number; total: number;
  onChange: (idx: number, updated: Skill) => void;
  onMove: (idx: number, dir: -1 | 1) => void;
  onDelete: (idx: number) => void;
}) {
  const upd = (field: keyof Skill, val: string | number) =>
    onChange(idx, { ...skill, [field]: val });

  return (
    <div className="brutal-panel p-5 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[11px] text-on-surface-variant">SKILL #{idx + 1}</span>
        <div className="flex gap-2">
          <button onClick={() => onMove(idx, -1)} disabled={idx === 0} className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
          <button onClick={() => onMove(idx, 1)} disabled={idx === total - 1} className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </button>
          <button onClick={() => onDelete(idx)} className="text-error hover:brightness-125 transition-colors">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name">
          <input className={inputCls} value={skill.name} onChange={(e) => upd("name", e.target.value)} />
        </Field>
        <Field label="Level (0-100)">
          <div className="space-y-2">
            <input type="range" min={0} max={100} value={skill.level}
              onChange={(e) => upd("level", Number(e.target.value))} className="w-full accent-[#00C2CB]" />
            <div className="flex justify-between font-mono text-[10px] text-on-surface-variant/60">
              <span>0</span>
              <span className="text-primary font-bold">{skill.level}</span>
              <span>100</span>
            </div>
          </div>
        </Field>
      </div>
      <Field label="Icon">
        <input className={inputCls} value={skill.icon} onChange={(e) => upd("icon", e.target.value)} placeholder="e.g. code, smartphone, memory" />
        <IconReference onPick={(icon) => upd("icon", icon)} />
      </Field>
      <Field label="Description">
        <input className={inputCls} value={skill.description} onChange={(e) => upd("description", e.target.value)} />
      </Field>
    </div>
  );
}

// ─── Project row ──────────────────────────────────────────────────────────────

function ProjectRow({ project, idx, total, onChange, onMove, onDelete }: {
  project: Project; idx: number; total: number;
  onChange: (idx: number, updated: Project) => void;
  onMove: (idx: number, dir: -1 | 1) => void;
  onDelete: (idx: number) => void;
}) {
  const upd = (field: keyof Project, val: string | string[] | null) =>
    onChange(idx, { ...project, [field]: val });

  // Uncontrolled: user types commas/spaces freely, committed on blur.
  // Keyed on joinedTags so it remounts with the right value if the
  // underlying project changes (e.g. reordered via move up/down).
  const joinedTags = project.tags.join(", ");

  return (
    <div className="brutal-panel p-5 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[11px] text-on-surface-variant">PROJECT #{idx + 1}</span>
        <div className="flex gap-2">
          <button onClick={() => onMove(idx, -1)} disabled={idx === 0} className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
          <button onClick={() => onMove(idx, 1)} disabled={idx === total - 1} className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </button>
          <button onClick={() => onDelete(idx)} className="text-error hover:brightness-125 transition-colors">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name">
          <input className={inputCls} value={project.name} onChange={(e) => upd("name", e.target.value)} />
        </Field>
        <Field label="Link (optional)">
          <input className={inputCls} value={project.link ?? ""} placeholder="https://..." onChange={(e) => upd("link", e.target.value || null)} />
        </Field>
      </div>
      <Field label="Size">
        <SizeSelect value={project.size} onChange={(v) => upd("size", v)} />
      </Field>
      <Field label="Description">
        <textarea className={`${inputCls} resize-none`} rows={3} value={project.description} onChange={(e) => upd("description", e.target.value)} />
      </Field>
      <Field label="Tags (comma-separated)">
        <input
          key={joinedTags}
          className={inputCls}
          defaultValue={joinedTags}
          onBlur={(e) => upd("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
          placeholder="e.g. IoT, Mobile, Flutter"
        />
      </Field>
    </div>
  );
}

// ─── Experience row ──────────────────────────────────────────────────────────

function ExperienceRow({ item, idx, total, onChange, onMove, onDelete }: {
  item: Experience; idx: number; total: number;
  onChange: (idx: number, updated: Experience) => void;
  onMove: (idx: number, dir: -1 | 1) => void;
  onDelete: (idx: number) => void;
}) {
  const upd = (field: keyof Experience, val: string) =>
    onChange(idx, { ...item, [field]: val });

  return (
    <div className="brutal-panel p-5 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[11px] text-on-surface-variant">ROLE #{idx + 1}</span>
        <div className="flex gap-2">
          <button onClick={() => onMove(idx, -1)} disabled={idx === 0} className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
          <button onClick={() => onMove(idx, 1)} disabled={idx === total - 1} className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </button>
          <button onClick={() => onDelete(idx)} className="text-error hover:brightness-125 transition-colors">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Role">
          <input className={inputCls} value={item.role} onChange={(e) => upd("role", e.target.value)} />
        </Field>
        <Field label="Company">
          <input className={inputCls} value={item.company} onChange={(e) => upd("company", e.target.value)} />
        </Field>
      </div>
      <Field label="Period">
        <input className={inputCls} value={item.period} onChange={(e) => upd("period", e.target.value)} placeholder="e.g. Jan 2024 – Present" />
      </Field>
      <Field label="Icon">
        <input className={inputCls} value={item.icon} onChange={(e) => upd("icon", e.target.value)} placeholder="e.g. terminal" />
        <IconReference onPick={(icon) => upd("icon", icon)} />
      </Field>
      <Field label="Description">
        <textarea className={`${inputCls} resize-none`} rows={3} value={item.description} onChange={(e) => upd("description", e.target.value)} />
      </Field>
    </div>
  );
}

// ─── Certificate row ──────────────────────────────────────────────────────────

function CertificateRow({ cert, idx, total, onChange, onMove, onDelete }: {
  cert: Certificate; idx: number; total: number;
  onChange: (idx: number, updated: Certificate) => void;
  onMove: (idx: number, dir: -1 | 1) => void;
  onDelete: (idx: number) => void;
}) {
  const upd = (field: keyof Certificate, val: string | null) =>
    onChange(idx, { ...cert, [field]: val });

  return (
    <div className="brutal-panel p-5 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[11px] text-on-surface-variant">CERTIFICATE #{idx + 1}</span>
        <div className="flex gap-2">
          <button onClick={() => onMove(idx, -1)} disabled={idx === 0} className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
          <button onClick={() => onMove(idx, 1)} disabled={idx === total - 1} className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </button>
          <button onClick={() => onDelete(idx)} className="text-error hover:brightness-125 transition-colors">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name">
          <input className={inputCls} value={cert.name} onChange={(e) => upd("name", e.target.value)} />
        </Field>
        <Field label="Issuer">
          <input className={inputCls} value={cert.issuer} onChange={(e) => upd("issuer", e.target.value)} placeholder="e.g. Google, AWS" />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Date">
          <input className={inputCls} value={cert.date} onChange={(e) => upd("date", e.target.value)} placeholder="e.g. Jan 2024" />
        </Field>
        <Field label="Link (optional)">
          <input className={inputCls} value={cert.link ?? ""} placeholder="https://..." onChange={(e) => upd("link", e.target.value || null)} />
        </Field>
      </div>
    </div>
  );
}

// ─── Account link row ─────────────────────────────────────────────────────────

function AccountLinkRow({ link, idx, total, onChange, onMove, onDelete }: {
  link: AccountLink; idx: number; total: number;
  onChange: (idx: number, updated: AccountLink) => void;
  onMove: (idx: number, dir: -1 | 1) => void;
  onDelete: (idx: number) => void;
}) {
  const upd = (field: keyof AccountLink, val: string | null) =>
    onChange(idx, { ...link, [field]: val });

  return (
    <div className="brutal-panel p-5 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[11px] text-on-surface-variant">LINK #{idx + 1}</span>
        <div className="flex gap-2">
          <button onClick={() => onMove(idx, -1)} disabled={idx === 0} className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
          <button onClick={() => onMove(idx, 1)} disabled={idx === total - 1} className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </button>
          <button onClick={() => onDelete(idx)} className="text-error hover:brightness-125 transition-colors">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Platform">
          <input className={inputCls} value={link.platform} onChange={(e) => upd("platform", e.target.value)} placeholder="e.g. Steam, Nintendo Switch" />
        </Field>
        <Field label="Handle / Username / Friend Code">
          <input className={inputCls} value={link.handle} onChange={(e) => upd("handle", e.target.value)} placeholder="e.g. hmcldryl or SW-1234-5678-9012" />
        </Field>
      </div>
      <Field label="URL (optional)">
        <input className={inputCls} value={link.url ?? ""} placeholder="https://..." onChange={(e) => upd("url", e.target.value || null)} />
      </Field>
      <Field label="Icon">
        <input className={inputCls} value={link.icon} onChange={(e) => upd("icon", e.target.value)} placeholder="e.g. sports_esports" />
        <IconReference onPick={(icon) => upd("icon", icon)} />
      </Field>
    </div>
  );
}

// ─── Photo upload ─────────────────────────────────────────────────────────────

function PhotoUpload({ currentUrl, onUpload }: { currentUrl?: string; onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".png") && file.type !== "image/png") {
      setError("PNG only — upload a transparent .png file");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const url = await uploadProfilePhoto(file);
      onUpload(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="brutal-panel p-5 space-y-4">
      <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-primary">Profile Photo</div>
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-xl bg-surface-container border border-outline-variant/30 overflow-hidden shrink-0 flex items-center justify-center">
          {currentUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentUrl} alt="Profile" className="w-full h-full object-contain" />
          ) : (
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant/30">person</span>
          )}
        </div>
        <div className="space-y-2 min-w-0">
          <label className={`flex items-center gap-2 cursor-pointer ${inputCls} w-auto inline-flex px-4 py-2 border-2 border-black bg-surface-container-high text-on-surface font-mono text-[11px] font-bold uppercase tracking-[0.08em] shadow-brutal-sm brutal-press transition-all ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
            <span className="material-symbols-outlined text-[16px]">upload</span>
            {uploading ? "UPLOADING..." : currentUrl ? "REPLACE PHOTO" : "UPLOAD PHOTO"}
            <input type="file" accept=".png,image/png" className="hidden" onChange={handleFile} disabled={uploading} />
          </label>
          <p className="font-mono text-[10px] text-on-surface-variant/50">
            Transparent PNG · chest-up · updates hero + favicon
          </p>
          {error && <p className="font-mono text-[10px] text-error">{error}</p>}
        </div>
      </div>
      {currentUrl && (
        <div className="font-mono text-[10px] text-on-surface-variant/40 truncate">{currentUrl}</div>
      )}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("info");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (!auth) {
      router.replace("/login");
      return;
    }
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      setReady(true);
      const current = await getPortfolioData();
      // Normalize: guard fields that may be missing in older Firestore docs
      setData({
        ...current,
        accountLinks: current.accountLinks ?? [],
        skills: current.skills ?? [],
        projects: current.projects ?? [],
        experience: current.experience ?? [],
        certificates: current.certificates ?? [],
      });
    });
    return unsub;
  }, [router]);

  const save = useCallback(async () => {
    if (!data) return;
    setSaveStatus("saving");
    try {
      await setPortfolioData(data);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }, [data]);

  const handleLogout = async () => {
    if (auth) await signOut(auth);
    router.push("/login");
  };

  // ── Skill helpers ──
  const updateSkill = (idx: number, updated: Skill) =>
    setData((d) => d && { ...d, skills: d.skills.map((s, i) => (i === idx ? updated : s)) });
  const moveSkill = (idx: number, dir: -1 | 1) =>
    setData((d) => {
      if (!d) return d;
      const arr = [...d.skills];
      [arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]];
      return { ...d, skills: arr };
    });
  const deleteSkill = (idx: number) =>
    setData((d) => d && { ...d, skills: d.skills.filter((_, i) => i !== idx) });
  const addSkill = () =>
    setData((d) =>
      d && { ...d, skills: [...d.skills, { name: "New Skill", level: 75, color: AUTO_COLORS[d.skills.length % 3], icon: "code", description: "" }] }
    );

  // ── Project helpers ──
  const updateProject = (idx: number, updated: Project) =>
    setData((d) => d && { ...d, projects: d.projects.map((p, i) => (i === idx ? updated : p)) });
  const moveProject = (idx: number, dir: -1 | 1) =>
    setData((d) => {
      if (!d) return d;
      const arr = [...d.projects];
      [arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]];
      return { ...d, projects: arr };
    });
  const deleteProject = (idx: number) =>
    setData((d) => d && { ...d, projects: d.projects.filter((_, i) => i !== idx) });
  const addProject = () =>
    setData((d) =>
      d && { ...d, projects: [...d.projects, { name: "New Project", description: "", tags: [], link: null, size: "small" }] }
    );

  // ── Experience helpers ──
  const updateExp = (idx: number, updated: Experience) =>
    setData((d) => d && { ...d, experience: d.experience.map((e, i) => (i === idx ? updated : e)) });
  const moveExp = (idx: number, dir: -1 | 1) =>
    setData((d) => {
      if (!d) return d;
      const arr = [...d.experience];
      [arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]];
      return { ...d, experience: arr };
    });
  const deleteExp = (idx: number) =>
    setData((d) => d && { ...d, experience: d.experience.filter((_, i) => i !== idx) });
  const addExp = () =>
    setData((d) =>
      d && { ...d, experience: [...d.experience, { role: "New Role", company: "", period: "", description: "", color: AUTO_COLORS[d.experience.length % 3], icon: "work" }] }
    );

  // ── Certificate helpers ──
  const updateCert = (idx: number, updated: Certificate) =>
    setData((d) => d && { ...d, certificates: d.certificates.map((c, i) => (i === idx ? updated : c)) });
  const moveCert = (idx: number, dir: -1 | 1) =>
    setData((d) => {
      if (!d) return d;
      const arr = [...d.certificates];
      [arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]];
      return { ...d, certificates: arr };
    });
  const deleteCert = (idx: number) =>
    setData((d) => d && { ...d, certificates: d.certificates.filter((_, i) => i !== idx) });
  const addCert = () =>
    setData((d) =>
      d && { ...d, certificates: [...d.certificates, { name: "New Certificate", issuer: "", date: "", link: null }] }
    );

  // ── Account link helpers ──
  const updateAccountLink = (idx: number, updated: AccountLink) =>
    setData((d) => d && { ...d, accountLinks: (d.accountLinks ?? []).map((l, i) => (i === idx ? updated : l)) });
  const moveAccountLink = (idx: number, dir: -1 | 1) =>
    setData((d) => {
      if (!d) return d;
      const arr = [...(d.accountLinks ?? [])];
      [arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]];
      return { ...d, accountLinks: arr };
    });
  const deleteAccountLink = (idx: number) =>
    setData((d) => d && { ...d, accountLinks: (d.accountLinks ?? []).filter((_, i) => i !== idx) });
  const addAccountLink = () =>
    setData((d) =>
      d && { ...d, accountLinks: [...(d.accountLinks ?? []), { platform: "New Platform", handle: "", url: null, icon: "link", color: AUTO_COLORS[(d.accountLinks ?? []).length % 3] }] }
    );

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "info",         label: "Personal Info", icon: "person" },
    { id: "skills",       label: "Skills",        icon: "auto_awesome" },
    { id: "projects",     label: "Projects",      icon: "grid_view" },
    { id: "experience",   label: "Experience",    icon: "work" },
    { id: "certificates", label: "Certificates",  icon: "workspace_premium" },
    { id: "accounts",     label: "Links",         icon: "link" },
  ];

  if (!ready || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-[12px] text-on-surface-variant animate-pulse">Loading…</div>
      </div>
    );
  }

  const accountLinks = data.accountLinks ?? [];
  const certificates = data.certificates ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed top-0 w-full z-50 bg-surface border-b-4 border-black">
        <div className="flex items-center justify-between h-16 px-5 md:px-8 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-[11px] font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              SITE
            </Link>
            <div className="w-px h-4 bg-black" />
            <span className="font-display text-lg font-bold text-on-surface">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            {saveStatus !== "idle" && (
              <span className={`font-mono text-[11px] font-bold ${
                saveStatus === "saved" ? "text-primary" :
                saveStatus === "error" ? "text-error" : "text-on-surface-variant animate-pulse"
              }`}>
                {saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "✓ Saved" : "✗ Error"}
              </span>
            )}
            <button
              onClick={save}
              disabled={saveStatus === "saving"}
              className="brutal-press bg-primary text-on-primary font-mono text-[11px] font-bold py-2 px-5 border-2 border-black shadow-brutal-sm transition-all disabled:opacity-60 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              Save
            </button>
            <button
              onClick={handleLogout}
              className="text-on-surface-variant hover:text-error font-mono text-[11px] font-bold transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16 flex min-h-screen">
        {/* Sidebar tabs */}
        <aside className="hidden md:flex w-56 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r-4 border-black flex-col pt-6 pb-8">
          <nav className="space-y-1 px-3">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors font-body text-sm border-2 ${
                  tab === t.id
                    ? "bg-primary text-on-primary border-black"
                    : "text-on-surface-variant border-transparent hover:border-black hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto px-5">
            <div className="font-mono text-[10px] text-on-surface-variant/70 leading-relaxed">
              Changes save to Firestore instantly. Live site updates in real-time.
            </div>
          </div>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t-4 border-black flex overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                tab === t.id ? "text-primary" : "text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
              <span className="font-mono text-[9px] uppercase font-bold">{t.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 md:ml-56 px-5 md:px-10 py-8 pb-24 md:pb-8 max-w-[900px]">

          {/* Personal Info */}
          {tab === "info" && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-on-surface">Personal Info</h2>
              <PhotoUpload
                currentUrl={data.personalInfo.photoUrl}
                onUpload={(url) => setData({ ...data, personalInfo: { ...data.personalInfo, photoUrl: url } })}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name">
                  <input className={inputCls} value={data.personalInfo.name}
                    onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, name: e.target.value } })} />
                </Field>
                <Field label="Tagline">
                  <input className={inputCls} value={data.personalInfo.tagline}
                    onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, tagline: e.target.value } })} />
                </Field>
                <Field label="Email">
                  <input type="email" className={inputCls} value={data.personalInfo.email}
                    onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, email: e.target.value } })} />
                </Field>
                <Field label="Location">
                  <input className={inputCls} value={data.personalInfo.location}
                    onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, location: e.target.value } })} />
                </Field>
                <Field label="GitHub URL">
                  <input className={inputCls} value={data.personalInfo.github}
                    onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, github: e.target.value } })} />
                </Field>
                <Field label="LinkedIn URL">
                  <input className={inputCls} value={data.personalInfo.linkedin}
                    onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, linkedin: e.target.value } })} />
                </Field>
              </div>
              <Field label="Bio">
                <textarea className={`${inputCls} resize-none`} rows={5} value={data.personalInfo.bio}
                  onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, bio: e.target.value } })} />
              </Field>
            </div>
          )}

          {/* Skills */}
          {tab === "skills" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold text-on-surface">Skills ({data.skills.length})</h2>
                <button onClick={addSkill} className="brutal-press flex items-center gap-2 bg-surface-container-high border-2 border-black text-on-surface font-mono text-[11px] font-bold uppercase tracking-[0.08em] py-2 px-4 shadow-brutal-sm transition-all">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Add Skill
                </button>
              </div>
              <div className="space-y-4">
                {data.skills.map((skill, idx) => (
                  <SkillRow key={String(idx)} skill={skill} idx={idx} total={data.skills.length}
                    onChange={updateSkill} onMove={moveSkill} onDelete={deleteSkill} />
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {tab === "projects" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold text-on-surface">Projects ({data.projects.length})</h2>
                <button onClick={addProject} className="brutal-press flex items-center gap-2 bg-surface-container-high border-2 border-black text-on-surface font-mono text-[11px] font-bold uppercase tracking-[0.08em] py-2 px-4 shadow-brutal-sm transition-all">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Add Project
                </button>
              </div>
              <div className="bg-tertiary border-2 border-black p-4 mb-2">
                <p className="font-mono text-[11px] text-on-tertiary">
                  <strong>Size guide:</strong> big (col-span-8) · small (col-span-4) · wide (col-span-12) · other (col-span-6)
                </p>
              </div>
              <div className="space-y-4">
                {data.projects.map((project, idx) => (
                  <ProjectRow key={String(idx)} project={project} idx={idx} total={data.projects.length}
                    onChange={updateProject} onMove={moveProject} onDelete={deleteProject} />
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {tab === "experience" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold text-on-surface">Experience ({data.experience.length})</h2>
                <button onClick={addExp} className="brutal-press flex items-center gap-2 bg-surface-container-high border-2 border-black text-on-surface font-mono text-[11px] font-bold uppercase tracking-[0.08em] py-2 px-4 shadow-brutal-sm transition-all">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Add Role
                </button>
              </div>
              <div className="space-y-4">
                {data.experience.map((item, idx) => (
                  <ExperienceRow key={String(idx)} item={item} idx={idx} total={data.experience.length}
                    onChange={updateExp} onMove={moveExp} onDelete={deleteExp} />
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {tab === "certificates" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold text-on-surface">Certificates ({certificates.length})</h2>
                <button onClick={addCert} className="brutal-press flex items-center gap-2 bg-surface-container-high border-2 border-black text-on-surface font-mono text-[11px] font-bold uppercase tracking-[0.08em] py-2 px-4 shadow-brutal-sm transition-all">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Add Certificate
                </button>
              </div>
              <div className="space-y-4">
                {certificates.map((cert, idx) => (
                  <CertificateRow key={String(idx)} cert={cert} idx={idx} total={certificates.length}
                    onChange={updateCert} onMove={moveCert} onDelete={deleteCert} />
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {tab === "accounts" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold text-on-surface">Links ({accountLinks.length})</h2>
                <button onClick={addAccountLink} className="brutal-press flex items-center gap-2 bg-surface-container-high border-2 border-black text-on-surface font-mono text-[11px] font-bold uppercase tracking-[0.08em] py-2 px-4 shadow-brutal-sm transition-all">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Add Link
                </button>
              </div>
              <div className="bg-secondary border-2 border-black p-4 mb-2">
                <p className="font-mono text-[11px] text-on-secondary">
                  Leave URL empty for accounts with no link (e.g. Nintendo Switch friend codes).
                </p>
              </div>
              <div className="space-y-4">
                {accountLinks.map((link, idx) => (
                  <AccountLinkRow key={String(idx)} link={link} idx={idx} total={accountLinks.length}
                    onChange={updateAccountLink} onMove={moveAccountLink} onDelete={deleteAccountLink} />
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
