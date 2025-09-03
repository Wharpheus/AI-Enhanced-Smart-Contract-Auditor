"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchAgents, fetchCoins, fetchScrollEvents } from "@/lib/api";

type Agent = {
  runtime_id: string;
  title: string;
  concepts: string[];
  branch_count: number;
  quarantined?: boolean;
};

type CoinEvent = {
  user: string;
  amount: number;
  note?: string;
  timestamp: string;
};

type ScrollEvent = {
  message: string;
  timestamp: string;
};

type AuditContextType = {
  agents: Agent[];
  coins: CoinEvent[];
  scrollEvents: ScrollEvent[];
  logScroll: (message: string) => void;
};

const AuditContext = createContext<AuditContextType>({
  agents: [],
  coins: [],
  scrollEvents: [],
  logScroll: () => {},
});

export function AuditProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [coins, setCoins] = useState<CoinEvent[]>([]);
  const [scrollEvents, setScrollEvents] = useState<ScrollEvent[]>([]);

  useEffect(() => {
    fetchAgents().then(setAgents);
    fetchCoins().then(setCoins);
    fetchScrollEvents().then(setScrollEvents);
  }, []);

  const logScroll = (message: string) => {
    const entry = { message, timestamp: new Date().toISOString() };
    setScrollEvents((prev) => [entry, ...prev]);
  };

  return (
    <AuditContext.Provider value={{ agents, coins, scrollEvents, logScroll }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  return useContext(AuditContext);
}
