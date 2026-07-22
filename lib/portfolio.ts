import data from "@/data/portfolio.json";

export type PersonalInfo = {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  photoUrl?: string;
};

export type Skill = {
  name: string;
  color: string;
  icon: string;
  description: string;
};

export type Project = {
  name: string;
  description: string;
  tags: string[];
  link: string | null;
  size: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  date: string;
  link: string | null;
  /** Filename under /public/certificates, e.g. "aws-saa.png" */
  image?: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  color: string;
  icon: string;
};

export type AccountLink = {
  platform: string;
  handle: string;
  url: string | null;
  icon: string;
  color: string;
};

export type PortfolioData = {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  certificates: Certificate[];
  accountLinks: AccountLink[];
};

export const portfolio: PortfolioData = data as PortfolioData;
