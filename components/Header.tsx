"use client";

import React from "react";
import { Shield, Brain, Zap } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-surface-secondary border-b border-surface-tertiary">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Browser-like interface */}
          <div className="flex items-center space-x-4">
            {/* Browser buttons */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-danger"></div>
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>

            {/* URL bar */}
            <div className="bg-surface-tertiary rounded-lg px-4 py-2 flex-1 max-w-md">
              <span className="text-text-muted text-sm font-mono">
                localhost:5000/audit
              </span>
            </div>
          </div>

          {/* Title and icons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-text-primary font-semibold">
                Smart Contract Auditor
              </span>
            </div>

            <div className="flex items-center space-x-2 text-text-secondary">
              <Brain className="w-4 h-4" />
              <span className="text-xs">GPT-4</span>
              <Zap className="w-4 h-4" />
              <span className="text-xs">Slither</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
