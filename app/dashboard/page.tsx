"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  getPortfolioData,
  setPortfolioData,
  seedPortfolioIfEmpty,
  type PortfolioData,
  type Skill,
  type Project,
  type Experience,
} from "@/lib/firestore";

type Tab = "info" | "skills" | "projects" | "experience";

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
        <div className="grid grid-cols-2 gap-4">
          <Field label="Level (0-100)">
            <input
              type="number"
              min={0}
              max={100}
              className={inputCls}
              value={skill.level}
              onChange={(e) => upd("level", Number(e.target.value))}
            />
          </Field>
          <Field label="Color">
            <select
              className={selectCls}
              value={skill.color}
              onChange={(e) => upd("color", e.target.value)}
            >
              {COLOR_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>
      <Field label="Icon (Material Symbols name)">
        <input
          className={inputCls}
          value={skill.icon}
          onChange={(e) => upd("icon", e.target.value)}
          placeholder="e.g. code, smartphone, memory"
        />
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
        <div className="grid grid-cols-2 gap-4">
          <Field label="Size">
            <select className={selectCls} value={project.size} onChange={(e) => upd("size", e.target.value)}>
              {SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Accent color">
            <select className={selectCls} value={project.accentColor} onChange={(e) => upd("accentColor", e.target.value)}>
              {COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>
      </div>
      <Field label="Description">
        <textarea
          className={`${inputCls} resize-none`}
          rows={3}
          value={project.description}
          onChange={(e) => upd("description", e.target.value)}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Tags (comma-separated)">
          <input
            className={inputCls}
            value={project.tags.join(", ")}
            onChange={(e) =>
              upd("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))
            }
          />
        </Field>
        <Field label="Link (optional)">
          <input
            className={inputCls}
            value={project.link ?? ""}
            placeholder="https://..."
            onChange={(e) => upd("link", e.target.value || null)}
          />
        </Field>
      </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Period">
          <input className={inputCls} value={item.period} onChange={(e) => upd("period", e.target.value)} />
        </Field>
        <Field label="Color">
          <select className={selectCls} value={item.color} onChange={(e) => upd("color", e.target.value)}>
            {COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Icon">
          <input className={inputCls} value={item.icon} onChange={(e) => upd("icon", e.target.value)} placeholder="e.g. terminal" />
        </Field>
      </div>
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

// ─── Main dashboard ──────────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("info");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (!auth) {
      router.replace("/nexus-login");
      return;
    }
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/nexus-login");
        return;
      }
      setReady(true);
      await seedPortfolioIfEmpty();
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
    router.push("/nexus-login");
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

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "info", label: "Personal Info", icon: "person" },
    { id: "skills", label: "Arsenal", icon: "swords" },
    { id: "projects", label: "Quest Log", icon: "task_alt" },
    { id: "experience", label: "Experience", icon: "military_tech" },
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
            <a href="/" className="font-mono text-[11px] text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              NEXUS
            </a>
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
                    key={idx}
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
                    key={idx}
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
                    key={idx}
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
        </main>
      </div>
    </div>
  );
}
