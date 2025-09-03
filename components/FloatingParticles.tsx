"use client";

import React from "react";
import "../styles/FloatingParticles.css";

const FloatingParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full opacity-60 animate-float">
        <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
      </div>
      <div
        className="absolute top-40 right-32 w-1.5 h-1.5 bg-accent-purple rounded-full opacity-40 animate-float animate-delay-1"
      >
        <div className="w-full h-full bg-accent-purple rounded-full animate-pulse"></div>
      </div>

      <div
        className="absolute bottom-40 left-32 w-1 h-1 bg-accent-cyan rounded-full opacity-50 animate-float animate-delay-2"
      >
        <div className="w-full h-full bg-accent-cyan rounded-full animate-pulse"></div>
      </div>

      <div
        className="absolute top-60 left-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-30 animate-float animate-delay-3"
      >
        <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
      </div>

      <div
        className="absolute bottom-60 right-20 w-2 h-2 bg-accent-purple rounded-full opacity-40 animate-float animate-delay-4"
      >
        <div className="w-full h-full bg-accent-purple rounded-full animate-pulse"></div>
      </div>

        <div
          className="absolute top-1/2 left-10 w-1 h-1 bg-accent-cyan rounded-full opacity-60 animate-float animate-delay-5"
        >
          <div className="w-full h-full bg-accent-cyan rounded-full animate-pulse"></div>
              </div>
            </div>
          );
      };
