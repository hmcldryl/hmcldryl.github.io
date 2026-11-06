"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    // Threshold 0: a ratio threshold on a tall section leaves a blank gap on
    // mobile until that share of the section has scrolled into view.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
