"use client";

import { useSyncExternalStore } from "react";
import { SECTION_IDS } from "./nav";

// Clears the fixed header, plus a little slack.
const ACTIVATION_LINE = 120;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

// Uses getBoundingClientRect, not offsetTop: sections sit inside transformed
// [data-reveal] wrappers, which become their offsetParent, so offsetTop is 0.
function getActiveSection() {
  let active = SECTION_IDS[0];
  for (const id of SECTION_IDS) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= ACTIVATION_LINE) active = id;
  }
  return active;
}

export function useActiveSection() {
  return useSyncExternalStore(subscribe, getActiveSection, () => SECTION_IDS[0]);
}
