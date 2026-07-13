"use client";

import { useEffect } from "react";
import { usePortfolio } from "@/lib/contexts/PortfolioContext";

export function FaviconUpdater() {
  const { personalInfo } = usePortfolio();

  useEffect(() => {
    const url = personalInfo.photoUrl;
    if (!url) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = url;
  }, [personalInfo.photoUrl]);

  return null;
}
