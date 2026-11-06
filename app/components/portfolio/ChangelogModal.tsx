"use client";

import { useEffect, useRef } from "react";
import { CHANGELOG } from "@/lib/changelog";

export function ChangelogModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // showModal() puts the dialog in the top layer, so it escapes the transformed
  // nav it's rendered in, and gives us focus trapping, Escape handling and
  // focus restoration for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Changelog"
      onClose={onClose}
      onClick={(e) => {
        // Only the backdrop reports the dialog itself as the click target.
        if (e.target === dialogRef.current) onClose();
      }}
      className="brutal-panel m-auto p-0 w-[calc(100%-2.5rem)] max-w-lg max-h-[80vh] overflow-y-auto bg-surface text-on-surface backdrop:bg-black/50"
    >
      <div className="flex items-center justify-between p-5 border-b-2 border-black sticky top-0 bg-surface">
        <h2 className="font-display text-xl font-bold text-on-surface">Changelog</h2>
        <button
          onClick={onClose}
          aria-label="Close changelog"
          className="brutal-press-sm flex p-1 border-2 border-black bg-surface shadow-brutal-sm"
        >
          <span className="icon text-[18px]">close</span>
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
    </dialog>
  );
}
