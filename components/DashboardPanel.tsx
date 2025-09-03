"use client";
import { useAudit } from "@/contexts/AuditContext";
import { useEffect, useState } from "react";

export default function DashboardPanel() {
  const { agents, coins, scrollEvents } = useAudit();
  const [activeTab, setActiveTab] = useState<"agents" | "coins" | "scrolls">(
    "agents",
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">🧠 Runtime Dashboard</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab("agents")}
          className={tabStyle(activeTab === "agents")}
        >
          Agents
        </button>
        <button
          onClick={() => setActiveTab("coins")}
          className={tabStyle(activeTab === "coins")}
        >
          Coins
        </button>
        <button
          onClick={() => setActiveTab("scrolls")}
          className={tabStyle(activeTab === "scrolls")}
        >
          Scrolls
        </button>
      </div>

      {activeTab === "agents" && (
        <div className="space-y-2">
          {agents.map((agent) => (
            <div
              key={agent.runtime_id}
              className="border border-zinc-700 p-2 rounded"
            >
              <div className="font-semibold text-white">{agent.title}</div>
              <div className="text-sm text-zinc-400">🧬 {agent.runtime_id}</div>
              <div className="text-sm text-zinc-400">
                🧠 Concepts: {agent.concepts?.join(", ")}
              </div>
              <div className="text-sm text-zinc-400">
                🪞 Branches: {agent.branch_count}
              </div>
              {agent.quarantined && (
                <div className="text-red-500 font-bold">🐾 Quarantined</div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "coins" && (
        <div className="space-y-2">
          {coins.map((coin, i) => (
            <div key={i} className="border border-yellow-700 p-2 rounded">
              <div className="text-white">
                🪙 {coin.amount} → {coin.user}
              </div>
              {coin.note && (
                <div className="text-sm text-yellow-400">📝 {coin.note}</div>
              )}
              <div className="text-xs text-zinc-500">{coin.timestamp}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "scrolls" && (
        <div className="space-y-2">
          {scrollEvents.map((event, i) => (
            <div key={i} className="border border-blue-700 p-2 rounded">
              <div className="text-white">📜 {event.message}</div>
              <div className="text-xs text-zinc-500">{event.timestamp}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function tabStyle(active: boolean) {
  return `px-3 py-1 rounded ${active ? "bg-zinc-800 text-white" : "bg-zinc-700 text-zinc-300"}`;
}
