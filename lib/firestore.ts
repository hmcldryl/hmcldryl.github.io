import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";
import rawData from "@/content/portfolio.json";

export type PersonalInfo = typeof rawData.personalInfo;
export type Skill = (typeof rawData.skills)[0];
export type Project = (typeof rawData.projects)[0];
export type Experience = (typeof rawData.experience)[0];
export type AccountLink = (typeof rawData.accountLinks)[0];
export type PortfolioData = typeof rawData;

const NOOP: Unsubscribe = () => {};

function getDocRef() {
  if (!db) return null;
  return doc(db, "portfolio", "data");
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const ref = getDocRef();
  if (!ref) return rawData;
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as PortfolioData;
  return rawData;
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
    } else {
      callback(rawData);
    }
  });
}

export async function seedPortfolioIfEmpty(): Promise<void> {
  const ref = getDocRef();
  if (!ref) return;
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, rawData);
  }
}
