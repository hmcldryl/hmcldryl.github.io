"use client";

import { useState } from "react";
import { usePortfolio } from "@/lib/contexts/PortfolioContext";

const fieldCls =
  "w-full bg-surface-container border-2 border-black p-4 text-on-surface font-body text-sm outline-none placeholder:text-on-surface-variant/50 transition-shadow";

export function ConnectSection() {
  const { personalInfo } = usePortfolio();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const subject = encodeURIComponent(`Nexus // Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="connect" className="py-24 px-5 md:px-margin-desktop">
      <div className="max-w-3xl mx-auto brutal-panel p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none select-none">
          <span className="material-symbols-outlined text-[120px]">alternate_email</span>
        </div>

        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
            Connect_Terminal
          </h2>
          <p className="text-on-surface-variant font-body">
            Secure communication channel. Awaiting input...
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-on-surface font-bold block">
                User.Identity
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className={fieldCls}
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-on-surface font-bold block">
                User.Contact
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="email@address.com"
                className={fieldCls}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-on-surface font-bold block">
              Payload.Message
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Enter transmission details..."
              className={`${fieldCls} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="brutal-press w-full bg-primary text-on-primary py-4 border-2 border-black shadow-brutal-sm font-mono text-[11px] tracking-[0.1em] font-bold uppercase transition-all flex items-center justify-center gap-2"
          >
            {status === "sent" ? (
              <>TRANSMISSION_SENT <span className="material-symbols-outlined text-[18px]">check_circle</span></>
            ) : (
              <>SEND_TRANSMISSION <span className="material-symbols-outlined text-[18px]">send</span></>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-mono text-[12px] font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-mono text-[12px] font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-mono text-[12px] font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Email
            </a>
          </div>
          <div className="font-mono text-[11px] text-on-surface-variant">
            STATUS: ONLINE // {personalInfo.location ? personalInfo.location.toUpperCase() : "ONLINE"}
          </div>
        </div>
      </div>
    </section>
  );
}
