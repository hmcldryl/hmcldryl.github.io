"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CHANGELOG } from "@/lib/changelog";

export function ChangelogModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // `open` only ever flips true from a client-side click, so document is
  // always available by the time we reach this branch (SSR always sees
  // open=false and bails above). Portal to <body>: rendering in place would
  // nest this "fixed" overlay inside SideNav's <aside>, whose slide-in
  // animation leaves a non-"none" transform at rest — that turns the aside
  // into a containing block for fixed descendants, clipping the modal to
  // the sidebar's width.
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Changelog"
      onClick={onClose}
    >
      <div
        className="brutal-panel w-full max-w-lg max-h-[80vh] overflow-y-auto bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b-2 border-black sticky top-0 bg-surface">
          <h2 className="font-display text-xl font-bold text-on-surface">Changelog</h2>
          <button
            onClick={onClose}
            aria-label="Close changelog"
            className="brutal-press p-1 border-2 border-black bg-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          {CHANGELOG.map((entry) => (
            <div key={entry.version}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono px-1.5 py-0.5 border border-black bg-tertiary text-on-tertiary">
                  {entry.version}
                </span>
                <h3 className="font-display text-sm font-semibold text-on-surface">
                  {entry.title}
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-0.5">
                {entry.notes.map((note, i) => (
                  <li key={i} className="text-[13px] text-on-surface-variant leading-relaxed">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
