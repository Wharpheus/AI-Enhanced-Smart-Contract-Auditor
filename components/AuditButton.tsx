"use client";

import React from "react";
import { Search, Loader2 } from "lucide-react";
import { useAudit } from "@/contexts/AuditContext";

const AuditButton: React.FC = () => {
  const { state, startAudit } = useAudit();
  return (
    <div className="flex justify-center pt-4">
      <button
        onClick={startAudit}
        disabled={state.isAnalyzing}
        className={`
          relative px-8 py-3 rounded-full font-semibold text-white
          transition-all duration-300 transform hover:scale-105
          ${
            state.isAnalyzing
              ? "bg-surface-tertiary cursor-not-allowed"
              : "bg-primary hover:bg-primary-dark glow-effect"
          }
        `}
      >
        {state.isAnalyzing ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Audit Contract</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AuditButton;
