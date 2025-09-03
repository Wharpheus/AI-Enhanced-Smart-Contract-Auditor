"use client";

import React, { useState } from "react";
import { Download, Copy, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { useAudit } from "@/contexts/AuditContext";
import { Vulnerability } from "@/lib/api";

const ResultsPanel: React.FC = () => {
  const { state } = useAudit();
  const [activeTab, setActiveTab] = useState<"issues" | "summary">("issues");

  // Use real vulnerabilities from audit result or fallback to sample data
  const vulnerabilities: Vulnerability[] = state.auditResult?.report
    .vulnerabilities || [
    {
      source: "Slither",
      severity: "critical",
      title: "Reentrancy Vulnerability",
      description:
        "The contract is vulnerable to reentrancy attacks due to state changes after external calls.",
      line: 5,
      fix: "Use ReentrancyGuard modifier and follow checks-effects-interactions pattern",
    },
    {
      source: "GPT-4",
      severity: "high",
      title: "Unchecked External Call",
      description:
        "External call return value is not checked, which could lead to silent failures.",
      line: 5,
      fix: "Check the return value of external calls and handle failures appropriately",
    },
    {
      source: "Slither",
      severity: "medium",
      title: "Gas Optimization Needed",
      description: "The contract could be optimized for gas efficiency.",
      line: 6,
      fix: "Optimize storage patterns and reduce unnecessary operations",
    },
  ];

  const getSeverityColor = (severity: Vulnerability["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-danger-dark border-danger text-danger";
      case "high":
        return "bg-warning-dark border-warning text-warning";
      case "medium":
        return "bg-warning border-warning-dark text-warning-dark";
      case "low":
        return "bg-success border-success-dark text-success-dark";
      default:
        return "bg-surface-tertiary border-surface text-text-secondary";
    }
  };

  const getSeverityIcon = (severity: Vulnerability["severity"]) => {
    switch (severity) {
      case "critical":
        return "🔴";
      case "high":
        return "🟠";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
      default:
        return "⚪";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Issues */}
      <div className="bg-surface rounded-xl border border-surface-tertiary p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            🔍 Audit Report
          </h3>
          <div className="flex items-center space-x-2">
            <div className="bg-danger-dark text-white px-3 py-1 rounded-full text-sm font-semibold">
              Score: 35/100
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-4">
          <button
            onClick={() => setActiveTab("issues")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "issues"
                ? "bg-primary text-white"
                : "bg-surface-tertiary text-text-secondary hover:text-text-primary"
            }`}
          >
            Issues ({vulnerabilities.length})
          </button>
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "summary"
                ? "bg-primary text-white"
                : "bg-surface-tertiary text-text-secondary hover:text-text-primary"
            }`}
          >
            Summary
          </button>
        </div>

        {activeTab === "issues" && (
          <div className="space-y-3">
            {vulnerabilities.map((vuln) => (
              <div
                key={vuln.id}
                className={`p-4 rounded-lg border ${getSeverityColor(vuln.severity)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {getSeverityIcon(vuln.severity)}
                    </span>
                    <h4 className="font-semibold">
                      {vuln.severity.toUpperCase()}: {vuln.title}
                    </h4>
                  </div>
                  <span className="text-xs bg-black bg-opacity-20 px-2 py-1 rounded">
                    Line {vuln.line}
                  </span>
                </div>
                <p className="text-sm mb-3 opacity-90">{vuln.description}</p>
                <div className="bg-black bg-opacity-20 p-3 rounded">
                  <p className="text-xs font-medium mb-1">💡 Suggested Fix:</p>
                  <p className="text-xs opacity-90">{vuln.fix}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "summary" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-secondary p-4 rounded-lg">
                <h4 className="text-sm font-medium text-text-secondary mb-1">
                  Processing Time
                </h4>
                <p className="text-2xl font-bold text-primary">1.8s</p>
              </div>
              <div className="bg-surface-secondary p-4 rounded-lg">
                <h4 className="text-sm font-medium text-text-secondary mb-1">
                  Issues Found
                </h4>
                <p className="text-2xl font-bold text-danger">
                  {vulnerabilities.length}
                </p>
              </div>
            </div>
            <div className="bg-surface-secondary p-4 rounded-lg">
              <h4 className="text-sm font-medium text-text-secondary mb-1">
                Confidence
              </h4>
              <p className="text-2xl font-bold text-success">92%</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Actions */}
      <div className="bg-surface rounded-xl border border-surface-tertiary p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          📊 Analysis Summary
        </h3>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full bg-success-dark hover:bg-success text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
            <Download className="w-5 h-5" />
            <span>📥 Download Report</span>
          </button>

          <button className="w-full bg-accent-purple hover:bg-accent-purple/80 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
            <Copy className="w-5 h-5" />
            <span>📋 Copy Report</span>
          </button>
        </div>

        {/* Success Message */}
        <div className="bg-success-dark/20 border border-success-dark rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="font-semibold text-success">
              ✅ Smart Contract Successfully Audited!
            </span>
          </div>
          <p className="text-sm text-success-dark">
            Review the issues above and implement suggested fixes for enhanced
            security.
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-surface-secondary p-3 rounded-lg text-center">
            <p className="text-xs text-text-secondary mb-1">Processing Time</p>
            <p className="text-lg font-bold text-primary">1.8s</p>
          </div>
          <div className="bg-surface-secondary p-3 rounded-lg text-center">
            <p className="text-xs text-text-secondary mb-1">Issues Found</p>
            <p className="text-lg font-bold text-danger">3</p>
          </div>
          <div className="bg-surface-secondary p-3 rounded-lg text-center">
            <p className="text-xs text-text-secondary mb-1">Confidence</p>
            <p className="text-lg font-bold text-success">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
