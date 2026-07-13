import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

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

export const EMPTY_PORTFOLIO: PortfolioData = {
  personalInfo: { name: "", tagline: "", bio: "", location: "", email: "", github: "", linkedin: "" },
  skills: [],
  projects: [],
  experience: [],
  certificates: [],
  accountLinks: [],
};

const NOOP: Unsubscribe = () => {};

function getDocRef() {
  if (!db) return null;
  return doc(db, "portfolio", "data");
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const ref = getDocRef();
  if (!ref) return EMPTY_PORTFOLIO;
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as PortfolioData;
  return EMPTY_PORTFOLIO;
}

export async function setPortfolioData(data: PortfolioData): Promise<void> {
  const ref = getDocRef();
  if (!ref) throw new Error("Firebase not configured");
  await setDoc(ref, data);
}

export function subscribeToPortfolio(
  callback: (data: PortfolioData) => void
): Unsubscribe {
  const ref = getDocRef();
  if (!ref) return NOOP;
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as PortfolioData);
    }
  });
}
