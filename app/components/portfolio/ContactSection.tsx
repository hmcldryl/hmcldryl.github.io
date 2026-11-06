"use client";

import { useState } from "react";
import { portfolio } from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

const fieldCls =
  "w-full bg-surface-container border-2 border-black p-3 text-on-surface font-body text-base outline-none placeholder:text-on-surface-variant/70 transition-shadow";
const labelCls = "text-[13px] font-semibold text-on-surface block";
const linkCls =
  "text-on-surface-variant hover:text-primary-ink transition-colors flex items-center justify-center gap-1.5 min-h-11 min-w-11 text-[13px] font-medium";

export function ContactSection() {
  const { personalInfo } = portfolio;
  const [handedOff, setHandedOff] = useState(false);

  // There's no backend: the form only drafts an email in the visitor's mail
  // app. Nothing confirms it was sent, and if no mail app is set up nothing
  // happens at all, so keep what they typed and point them at the address.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setHandedOff(true);
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-5 md:px-10 xl:px-margin-desktop">
      <div className="max-w-2xl mx-auto brutal-panel p-6 md:p-8">
        <SectionHeading title="Get in Touch" subtitle="Have a project in mind? Send a message." />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className={labelCls}>
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className={fieldCls}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contact-email" className={labelCls}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="email@address.com"
                className={fieldCls}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-message" className={labelCls}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              placeholder="What would you like to talk about?"
              className={`${fieldCls} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="brutal-press-sm w-full bg-primary text-on-primary py-3 border-2 border-black shadow-brutal-sm text-[13px] font-bold flex items-center justify-center gap-2"
          >
            Send Message <span className="icon text-[18px]">send</span>
          </button>

          <p role="status" className="text-[13px] text-on-surface-variant empty:hidden">
            {handedOff && (
              <>
                Your email app should open with this message ready to send. If it
                didn&apos;t, write to{" "}
                <a href={`mailto:${personalInfo.email}`} className="font-semibold text-primary-ink underline">
                  {personalInfo.email}
                </a>
                .
              </>
            )}
          </p>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-5">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={linkCls}>
              <span className="icon text-[16px]">code</span>
              GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
              <span className="icon text-[16px]">person</span>
              LinkedIn
            </a>
            <a href={`mailto:${personalInfo.email}`} className={linkCls}>
              <span className="icon text-[16px]">mail</span>
              Email
            </a>
          </div>
          {personalInfo.location && (
            <div className="text-[13px] text-on-surface-variant">
              {personalInfo.location}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
