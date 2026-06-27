"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { subscribeToPortfolio, type PortfolioData } from "@/lib/firestore";
import rawData from "@/content/portfolio.json";

// Static JSON is the initial state — no loading flash on first render.
// Firestore subscription overwrites it with live data once the client connects.
const PortfolioContext = createContext<PortfolioData>(rawData);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(rawData);

  useEffect(() => {
    const unsubscribe = subscribeToPortfolio((live) => setData(live));
    return unsubscribe;
  }, []);

  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);
