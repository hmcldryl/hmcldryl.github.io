"use client";

import { useState } from "react";
import { usePortfolio } from "@/lib/contexts/PortfolioContext";

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
      <div className="max-w-3xl mx-auto glass-panel rounded-2xl p-8 md:p-10 border border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.06] pointer-events-none select-none">
          <span className="material-symbols-outlined text-[120px]">alternate_email</span>
        </div>

        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
            Connect_Terminal
          </h2>
          <p className="text-on-surface-variant font-body">
            Secure communication channel. Awaiting input...
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-primary block">
                User.Identity
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-4 text-on-surface font-body text-sm focus:border-primary focus:shadow-[0_0_0_1px_#cfbcff] transition-all outline-none placeholder:text-on-surface-variant/40"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-primary block">
                User.Contact
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="email@address.com"
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-4 text-on-surface font-body text-sm focus:border-primary focus:shadow-[0_0_0_1px_#cfbcff] transition-all outline-none placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-primary block">
              Payload.Message
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Enter transmission details..."
              className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-4 text-on-surface font-body text-sm focus:border-primary focus:shadow-[0_0_0_1px_#cfbcff] transition-all outline-none resize-none placeholder:text-on-surface-variant/40"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-4 rounded-lg font-mono text-[11px] tracking-[0.1em] font-bold uppercase hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {status === "sent" ? (
              <>TRANSMISSION_SENT <span className="material-symbols-outlined text-[18px]">check_circle</span></>
            ) : (
              <>SEND_TRANSMISSION <span className="material-symbols-outlined text-[18px]">send</span></>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-mono text-[12px]"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-mono text-[12px]"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-mono text-[12px]"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Email
            </a>
          </div>
          <div className="font-mono text-[11px] text-on-surface-variant opacity-40">
            STATUS: ONLINE // {personalInfo.location ? personalInfo.location.toUpperCase() : "ONLINE"}
          </div>
        </div>
      </div>
    </section>
  );
}
