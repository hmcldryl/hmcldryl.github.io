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
  type AccountLink,
} from "@/lib/firestore";

type Tab = "info" | "skills" | "projects" | "experience" | "accounts";

const COLOR_OPTIONS = ["primary", "secondary", "tertiary"] as const;
const SIZE_OPTIONS = ["big", "small", "wide", "other"] as const;

// ─── Field helpers ───────────────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
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
  "w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-on-surface font-body text-sm focus:border-primary focus:shadow-[0_0_0_1px_#cfbcff] transition-all outline-none placeholder:text-on-surface-variant/40";

const selectCls =
  "bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-mono text-[12px] focus:border-primary outline-none";

const COLOR_SWATCHES = {
  primary:   { hex: "#cfbcff", label: "Primary (lavender)" },
  secondary: { hex: "#cdc0e9", label: "Secondary (muted purple)" },
  tertiary:  { hex: "#e7c365", label: "Tertiary (gold)" },
} as const;

function ColorSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(COLOR_SWATCHES) as Array<keyof typeof COLOR_SWATCHES>).map((key) => {
        const { hex, label } = COLOR_SWATCHES[key];
        const active = value === key;
        return (
          <button
            key={key}
            type="button"
            title={label}
            onClick={() => onChange(key)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-mono text-[11px] transition-all ${
              active
                ? "border-on-surface/60 bg-surface-container-high text-on-surface shadow-[0_0_8px_rgba(255,255,255,0.05)]"
                : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant/60"
            }`}
          >
            <span
              className="w-3 h-3 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: hex, boxShadow: active ? `0 0 8px ${hex}80` : undefined }}
            />
            {key}
          </button>
        );
      })}
    </div>
  );
}

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
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-mono text-[11px] transition-all ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant/60"
              }`}
            >
              {key}
              <span className={`text-[10px] opacity-60`}>{cols}</span>
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

const ICON_GROUPS = [
  { label: "Tech", icons: ["code", "terminal", "hub", "memory", "storage", "cloud", "android", "smartphone", "settings", "account_tree"] },
  { label: "Social", icons: ["person", "alternate_email", "link", "manage_accounts", "forum"] },
  { label: "Gaming", icons: ["sports_esports", "videogame_asset", "military_tech", "swords"] },
  { label: "Work", icons: ["work", "school", "rocket_launch", "palette", "task_alt", "business_center"] },
] as const;

function IconReference({ onPick }: { onPick: (icon: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="font-mono text-[10px] text-on-surface-variant/60 hover:text-primary transition-colors flex items-center gap-1"
      >
        <span className="material-symbols-outlined text-[13px]">{open ? "expand_less" : "expand_more"}</span>
        {open ? "hide icon reference" : "browse common icons"}
      </button>
      {open && (
        <div className="mt-2 glass-panel rounded-xl p-4 border border-outline-variant/20 space-y-3">
          {ICON_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="font-mono text-[10px] text-on-surface-variant/50 mb-2 uppercase tracking-[0.08em]">{group.label}</div>
              <div className="flex flex-wrap gap-2">
                {group.icons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    title={icon}
                    onClick={() => { onPick(icon); setOpen(false); }}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg bg-surface-container hover:bg-surface-container-high hover:text-primary text-on-surface-variant transition-all border border-transparent hover:border-primary/30"
                  >
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    <span className="font-mono text-[9px] opacity-60">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Skill row ────────────────────────────────────────────────────────────────

function SkillRow({
  skill,
  idx,
  total,
  onChange,
  onMove,
  onDelete,
}: {
  skill: Skill;
  idx: number;
  total: number;
  onChange: (idx: number, updated: Skill) => void;
  onMove: (idx: number, dir: -1 | 1) => void;
  onDelete: (idx: number) => void;
}) {
  const upd = (field: keyof Skill, val: string | number) =>
    onChange(idx, { ...skill, [field]: val });

  return (
    <div className="glass-panel rounded-xl p-5 border border-outline-variant/20 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[11px] text-on-surface-variant">SKILL #{idx + 1}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onMove(idx, -1)}
            disabled={idx === 0}
            className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
          <button
            onClick={() => onMove(idx, 1)}
            disabled={idx === total - 1}
            className="text-on-surface-variant hover:text-primary disabled:opacity-30 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </button>
          <button
            onClick={() => onDelete(idx)}
            className="text-error hover:brightness-125 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name">
          <input
            className={inputCls}
            value={skill.name}
            onChange={(e) => upd("name", e.target.value)}
          />
        </Field>
        <Field label="Level (0-100)">
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={100}
              value={skill.level}
              onChange={(e) => upd("level", Number(e.target.value))}
              className="w-full accent-[#cfbcff]"
            />
            <div className="flex justify-between font-mono text-[10px] text-on-surface-variant/60">
              <span>0</span>
              <span className="text-primary font-bold">{skill.level}</span>
              <span>100</span>
            </div>
          </div>
        </Field>
      </div>
      <Field label="Color">
        <ColorSelect value={skill.color} onChange={(v) => upd("color", v)} />
      </Field>
      <Field label="Icon">
        <input
          className={inputCls}
          value={skill.icon}
          onChange={(e) => upd("icon", e.target.value)}
          placeholder="e.g. code, smartphone, memory"
        />
        <IconReference onPick={(icon) => upd("icon", icon)} />
      </Field>
      <Field label="Description">
        <input
          className={inputCls}
          value={skill.description}
          onChange={(e) => upd("description", e.target.value)}
        />
      </Field>
    </div>
  );
}

// ─── Project row ──────────────────────────────────────────────────────────────

function ProjectRow({
  project,
  idx,
  total,
  onChange,
  onMove,
  onDelete,
}: {
  project: Project;
  idx: number;
  total: number;
  onChange: (idx: number, updated: Project) => void;
  onMove: (idx: number, dir: -1 | 1) => void;
  onDelete: (idx: number) => void;
}) {
  const upd = (field: keyof Project, val: string | string[] | null) =>
    onChange(idx, { ...project, [field]: val });

  return (
    <div className="glass-panel rounded-xl p-5 border border-outline-variant/20 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[11px] text-on-surface-variant">PROJECT #{idx + 1}</span>
        <div className="flex gap-2">
          <button onClick={() => onMove(idx, -1)} disabled={idx === 0} className="text-on-surface-variant hover:text-primary disabled:opacity-30">
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
          <button onClick={() => onMove(idx, 1)} disabled={idx === total - 1} className="text-on-surface-variant hover:text-primary disabled:opacity-30">
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </button>
          <button onClick={() => onDelete(idx)} className="text-error hover:brightness-125">
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
      <Field label="Accent color">
        <ColorSelect value={project.accentColor} onChange={(v) => upd("accentColor", v)} />
      </Field>
      <Field label="Description">
        <textarea
          className={`${inputCls} resize-none`}
          rows={3}
          value={project.description}
          onChange={(e) => upd("description", e.target.value)}
        />
      </Field>
      <Field label="Tags (comma-separated)">
        <input
          className={inputCls}
          value={project.tags.join(", ")}
          onChange={(e) =>
            upd("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))
          }
          placeholder="e.g. IoT, Mobile, Flutter"
        />
      </Field>
    </div>
  );
}

// ─── Experience row ──────────────────────────────────────────────────────────

function ExperienceRow({
  item,
  idx,
  total,
  onChange,
  onMove,
  onDelete,
}: {
  item: Experience;
  idx: number;
  total: number;
  onChange: (idx: number, updated: Experience) => void;
  onMove: (idx: number, dir: -1 | 1) => void;
  onDelete: (idx: number) => void;
}) {
  const upd = (field: keyof Experience, val: string) =>
    onChange(idx, { ...item, [field]: val });

  return (
    <div className="glass-panel rounded-xl p-5 border border-outline-variant/20 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[11px] text-on-surface-variant">ROLE #{idx + 1}</span>
        <div className="flex gap-2">
          <button onClick={() => onMove(idx, -1)} disabled={idx === 0} className="text-on-surface-variant hover:text-primary disabled:opacity-30">
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
          <button onClick={() => onMove(idx, 1)} disabled={idx === total - 1} className="text-on-surface-variant hover:text-primary disabled:opacity-30">
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </button>
          <button onClick={() => onDelete(idx)} className="text-error hover:brightness-125">
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
      <Field label="Color">
        <ColorSelect value={item.color} onChange={(v) => upd("color", v)} />
      </Field>
      <Field label="Icon">
        <input className={inputCls} value={item.icon} onChange={(e) => upd("icon", e.target.value)} placeholder="e.g. terminal" />
        <IconReference onPick={(icon) => upd("icon", icon)} />
      </Field>
      <Field label="Description">
        <textarea
          className={`${inputCls} resize-none`}
          rows={3}
          value={item.description}
          onChange={(e) => upd("description", e.target.value)}
        />
      </Field>
    </div>
  );
}

// ─── Account link row ─────────────────────────────────────────────────────────

function AccountLinkRow({
  link,
  idx,
  total,
  onChange,
  onMove,
  onDelete,
}: {
  link: AccountLink;
  idx: number;
  total: number;
  onChange: (idx: number, updated: AccountLink) => void;
  onMove: (idx: number, dir: -1 | 1) => void;
  onDelete: (idx: number) => void;
}) {
  const upd = (field: keyof AccountLink, val: string | null) =>
    onChange(idx, { ...link, [field]: val });

  return (
    <div className="glass-panel rounded-xl p-5 border border-outline-variant/20 space-y-4">
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
      <Field label="Color">
        <ColorSelect value={link.color} onChange={(v) => upd("color", v)} />
      </Field>
      <Field label="Icon">
        <input className={inputCls} value={link.icon} onChange={(e) => upd("icon", e.target.value)} placeholder="e.g. sports_esports" />
        <IconReference onPick={(icon) => upd("icon", icon)} />
      </Field>
    </div>
  );
}

// ─── Photo upload ─────────────────────────────────────────────────────────────

function PhotoUpload({
  currentUrl,
  onUpload,
}: {
  currentUrl?: string;
  onUpload: (url: string) => void;
}) {
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
    <div className="glass-panel rounded-xl p-5 border border-outline-variant/20 space-y-4">
      <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-primary">Profile Photo</div>
      <div className="flex items-center gap-6">
        {/* Preview */}
        <div className="relative w-24 h-24 rounded-xl bg-surface-container border border-outline-variant/30 overflow-hidden shrink-0 flex items-center justify-center">
          {currentUrl ? (
            <img src={currentUrl} alt="Profile" className="w-full h-full object-contain" />
          ) : (
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant/30">person</span>
          )}
        </div>
        {/* Controls */}
        <div className="space-y-2 min-w-0">
          <label className={`flex items-center gap-2 cursor-pointer ${inputCls} w-auto inline-flex px-4 py-2 rounded-lg border border-outline-variant/30 bg-surface-container-high text-on-surface font-mono text-[11px] uppercase tracking-[0.08em] hover:border-primary hover:text-primary transition-all ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
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
        <div className="font-mono text-[10px] text-on-surface-variant/40 truncate">
          {currentUrl}
        </div>
      )}
    </div>
  );
}

// ─── Main dashboard ──────────────────────────────────────────────────────────

export default function Dashboard() {
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
      setData(current);
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
      d && {
        ...d,
        skills: [
          ...d.skills,
          { name: "New Skill", level: 75, color: "primary", icon: "code", description: "" },
        ],
      }
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
      d && {
        ...d,
        projects: [
          ...d.projects,
          { name: "New Project", description: "", tags: [], link: null, size: "small", accentColor: "primary" },
        ],
      }
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
      d && {
        ...d,
        experience: [
          ...d.experience,
          { role: "New Role", company: "", period: "", description: "", color: "primary", icon: "work" },
        ],
      }
    );

  // ── Account link helpers ──
  const updateAccountLink = (idx: number, updated: AccountLink) =>
    setData((d) => d && { ...d, accountLinks: d.accountLinks.map((l, i) => (i === idx ? updated : l)) });
  const moveAccountLink = (idx: number, dir: -1 | 1) =>
    setData((d) => {
      if (!d) return d;
      const arr = [...d.accountLinks];
      [arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]];
      return { ...d, accountLinks: arr };
    });
  const deleteAccountLink = (idx: number) =>
    setData((d) => d && { ...d, accountLinks: d.accountLinks.filter((_, i) => i !== idx) });
  const addAccountLink = () =>
    setData((d) =>
      d && {
        ...d,
        accountLinks: [
          ...d.accountLinks,
          { platform: "New Platform", handle: "", url: null, icon: "link", color: "primary" },
        ],
      }
    );

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "info", label: "Personal Info", icon: "person" },
    { id: "skills", label: "Arsenal", icon: "swords" },
    { id: "projects", label: "Quest Log", icon: "task_alt" },
    { id: "experience", label: "Experience", icon: "military_tech" },
    { id: "accounts", label: "Accounts", icon: "manage_accounts" },
  ];

  if (!ready || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-[12px] text-on-surface-variant animate-pulse">
          LOADING_PORTFOLIO_DATA...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex items-center justify-between h-16 px-5 md:px-8 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-[11px] text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              NEXUS
            </Link>
            <div className="w-px h-4 bg-outline-variant/40" />
            <span className="font-display text-lg font-bold text-primary">CMS // Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Save status */}
            {saveStatus !== "idle" && (
              <span className={`font-mono text-[11px] ${
                saveStatus === "saved" ? "text-tertiary" :
                saveStatus === "error" ? "text-error" : "text-on-surface-variant animate-pulse"
              }`}>
                {saveStatus === "saving" ? "SAVING..." : saveStatus === "saved" ? "✓ SAVED" : "✗ ERROR"}
              </span>
            )}
            <button
              onClick={save}
              disabled={saveStatus === "saving"}
              className="bg-primary text-on-primary font-mono text-[11px] tracking-[0.08em] uppercase py-2 px-5 rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              SAVE
            </button>
            <button
              onClick={handleLogout}
              className="text-on-surface-variant hover:text-error font-mono text-[11px] tracking-[0.08em] uppercase transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16 flex min-h-screen">
        {/* Sidebar tabs */}
        <aside className="hidden md:flex w-56 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface-container-lowest/80 backdrop-blur-xl border-r border-outline-variant/20 flex-col pt-6 pb-8">
          <nav className="space-y-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-all font-body text-sm ${
                  tab === t.id
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-on-surface-variant hover:bg-surface-variant/20 hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto px-5">
            <div className="font-mono text-[10px] text-on-surface-variant/50 leading-relaxed">
              Changes save to Firestore instantly. Live site updates in real-time.
            </div>
          </div>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20 flex">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                tab === t.id ? "text-primary" : "text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
              <span className="font-mono text-[9px] uppercase">{t.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 md:ml-56 px-5 md:px-10 py-8 pb-24 md:pb-8 max-w-[900px]">

          {/* Personal Info */}
          {tab === "info" && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-on-surface">Personal Info</h2>

              {/* Photo upload */}
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
                <h2 className="font-display text-2xl font-bold text-on-surface">Arsenal ({data.skills.length})</h2>
                <button
                  onClick={addSkill}
                  className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/30 text-on-surface font-mono text-[11px] uppercase tracking-[0.08em] py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  ADD SKILL
                </button>
              </div>
              <div className="space-y-4">
                {data.skills.map((skill, idx) => (
                  <SkillRow
                    key={`${idx}-${skill.name}`}
                    skill={skill}
                    idx={idx}
                    total={data.skills.length}
                    onChange={updateSkill}
                    onMove={moveSkill}
                    onDelete={deleteSkill}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {tab === "projects" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold text-on-surface">Quest Log ({data.projects.length})</h2>
                <button
                  onClick={addProject}
                  className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/30 text-on-surface font-mono text-[11px] uppercase tracking-[0.08em] py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  ADD PROJECT
                </button>
              </div>
              <div className="glass-panel rounded-xl p-4 border border-tertiary/20 mb-2">
                <p className="font-mono text-[11px] text-tertiary">
                  <strong>Size guide:</strong> big (col-span-8) · small (col-span-4) · wide (col-span-12) · other (col-span-6)
                </p>
              </div>
              <div className="space-y-4">
                {data.projects.map((project, idx) => (
                  <ProjectRow
                    key={`${idx}-${project.name}`}
                    project={project}
                    idx={idx}
                    total={data.projects.length}
                    onChange={updateProject}
                    onMove={moveProject}
                    onDelete={deleteProject}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {tab === "experience" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold text-on-surface">Experience ({data.experience.length})</h2>
                <button
                  onClick={addExp}
                  className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/30 text-on-surface font-mono text-[11px] uppercase tracking-[0.08em] py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  ADD ROLE
                </button>
              </div>
              <div className="space-y-4">
                {data.experience.map((item, idx) => (
                  <ExperienceRow
                    key={`${idx}-${item.role}`}
                    item={item}
                    idx={idx}
                    total={data.experience.length}
                    onChange={updateExp}
                    onMove={moveExp}
                    onDelete={deleteExp}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Accounts */}
          {tab === "accounts" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold text-on-surface">Accounts ({data.accountLinks.length})</h2>
                <button
                  onClick={addAccountLink}
                  className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/30 text-on-surface font-mono text-[11px] uppercase tracking-[0.08em] py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  ADD ACCOUNT
                </button>
              </div>
              <div className="glass-panel rounded-xl p-4 border border-secondary/20 mb-2">
                <p className="font-mono text-[11px] text-secondary">
                  Leave URL empty for accounts with no link (e.g. Nintendo Switch friend codes).
                </p>
              </div>
              <div className="space-y-4">
                {data.accountLinks.map((link, idx) => (
                  <AccountLinkRow
                    key={`${idx}-${link.platform}`}
                    link={link}
                    idx={idx}
                    total={data.accountLinks.length}
                    onChange={updateAccountLink}
                    onMove={moveAccountLink}
                    onDelete={deleteAccountLink}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
