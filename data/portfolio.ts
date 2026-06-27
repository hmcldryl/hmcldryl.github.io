import rawData from "@/content/portfolio.json";

// content/portfolio.json is the source of truth.
// Edit data there (or via the /dashboard CMS) — this file just re-exports for type safety.

export const personalInfo = rawData.personalInfo;
export const skills = rawData.skills;
export const projects = rawData.projects;
export const experience = rawData.experience;
