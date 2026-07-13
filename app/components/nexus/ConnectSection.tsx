"use client";

import { useState } from "react";
import { usePortfolio } from "@/lib/contexts/PortfolioContext";

const fieldCls =
  "w-full bg-surface-container border-2 border-black p-3 text-on-surface font-body text-sm outline-none placeholder:text-on-surface-variant/50 transition-shadow";

export function ConnectSection() {
  const { personalInfo } = usePortfolio();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="connect" className="py-16 px-5 md:px-margin-desktop">
      <div className="max-w-2xl mx-auto brutal-panel p-6 md:p-8">
        <div className="mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-1.5">
            Get in Touch
          </h2>
          <p className="text-on-surface-variant text-sm">
            Have a project in mind? Send a message.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your name"
                className={fieldCls}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">
                Email
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

          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-on-surface block">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="What would you like to talk about?"
              className={`${fieldCls} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="brutal-press w-full bg-primary text-on-primary py-3 border-2 border-black shadow-brutal-sm text-[13px] font-bold transition-all flex items-center justify-center gap-2"
          >
            {status === "sent" ? (
              <>Message Sent <span className="material-symbols-outlined text-[18px]">check_circle</span></>
            ) : (
              <>Send Message <span className="material-symbols-outlined text-[18px]">send</span></>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-5">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-[13px] font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-[13px] font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-[13px] font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">mail</span>
              Email
            </a>
          </div>
          {personalInfo.location && (
            <div className="text-[12px] text-on-surface-variant">
              {personalInfo.location}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
