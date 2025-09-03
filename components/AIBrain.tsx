"use client";

import React from "react";
import { Brain, Zap, Cpu } from "lucide-react";

const AIBrain: React.FC = () => {
  return (
    <div className="bg-surface rounded-xl border border-surface-tertiary p-6 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          AI Audit Engine
        </h3>
        <p className="text-text-secondary text-sm">
          GPT-4 + CodeBERT + Slither
        </p>
      </div>

      {/* AI Brain Visualization */}
      <div className="relative h-48 flex items-center justify-center">
        {/* Background Glow */}
        <div className="absolute inset-0 ai-gradient rounded-full opacity-20 blur-xl"></div>

        {/* Neural Network Nodes */}
        <div className="relative z-10 flex items-center justify-center">
          {/* Central Node */}
          <div className="w-16 h-16 bg-accent-purple rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
            <Brain className="w-8 h-8 text-white" />
          </div>

          {/* Surrounding Nodes */}
          <div className="absolute top-4 left-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg animate-float">
            <Zap className="w-6 h-6 text-white" />
          </div>

          <div
            className="absolute top-4 right-8 w-12 h-12 bg-accent-cyan rounded-full flex items-center justify-center shadow-lg animate-float animate-delay-1s"
          >
            <Cpu className="w-6 h-6 text-white" />
          </div>

          <div
            className="absolute bottom-4 left-12 w-10 h-10 bg-accent-purple rounded-full flex items-center justify-center shadow-lg animate-float animate-delay-2s"
          >
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>

          <div
            className="absolute bottom-4 right-12 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg animate-float animate-delay-3s"
          >
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full ai-brain-svg">
          <defs>
            <linearGradient
              id="connectionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Connection lines between nodes */}
          <line
            x1="96"
            y1="96"
            x2="48"
            y2="24"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="96"
            y1="96"
            x2="144"
            y2="24"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="96"
            y1="96"
            x2="60"
            y2="168"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="96"
            y1="96"
            x2="132"
            y2="168"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Processing Status */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-primary">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">AI Analysis Ready</span>
        </div>
      </div>
    </div>
  );
};

export default AIBrain;
