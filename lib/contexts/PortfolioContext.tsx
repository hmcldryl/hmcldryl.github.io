"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { subscribeToPortfolio, type PortfolioData, EMPTY_PORTFOLIO } from "@/lib/firestore";

const PortfolioContext = createContext<PortfolioData>(EMPTY_PORTFOLIO);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(EMPTY_PORTFOLIO);

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
