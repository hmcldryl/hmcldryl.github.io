"use client";

import { useEffect } from "react";
import { portfolio } from "@/lib/portfolio";

export function FaviconUpdater() {
  useEffect(() => {
    const url = portfolio.personalInfo.photoUrl;
    if (!url) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = url;
  }, []);

  return null;
}
