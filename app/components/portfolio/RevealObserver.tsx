"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const observe = () => {
      document.querySelectorAll("[data-reveal]").forEach((el) => revealObs.observe(el));
    };

    observe();

    // Re-observe on DOM changes (Firestore data arriving after mount)
    const mutObs = new MutationObserver(observe);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObs.disconnect();
      mutObs.disconnect();
    };
  }, []);

  return null;
}
