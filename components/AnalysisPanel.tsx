
import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, AlertTriangle, Info } from "react-feather";

interface AnalysisStep {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "error";
}

interface AuditContextType {
  analysisSteps: AnalysisStep[];
  currentStep: number;
  isAnalyzing: boolean;
}


const AnalysisPanel = () => {
  // Using local state instead of useAudit
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([
    { id: "1", name: "Step 1", description: "Initialize audit", status: "pending" },
    { id: "2", name: "Step 2", description: "Analyze contract", status: "pending" },
    { id: "3", name: "Step 3", description: "Generate report", status: "pending" },
  ]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(true);

  useEffect(() => {
    if (!isAnalyzing) return;

    if (currentStep < analysisSteps.length) {
      const timer = setTimeout(() => {
        setAnalysisSteps((steps) =>
          steps.map((step, idx) =>
            idx < currentStep
              ? { ...step, status: "completed" }
              : idx === currentStep
              ? { ...step, status: "running" }
              : step
          )
        );
        setCurrentStep((prev) => prev + 1);
      }, 1200);

      return () => clearTimeout(timer);
    } else {
      setIsAnalyzing(false);
      setAnalysisSteps((steps) =>
        steps.map((step) => ({ ...step, status: "completed" }))
      );
    }
  }, [currentStep, isAnalyzing, analysisSteps.length]);

  const getStepIcon = (status: AnalysisStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "running":
        return <Clock className="w-5 h-5 text-primary animate-spin" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-danger" />;
      default:
        return <Info className="w-5 h-5 text-text-muted" />;
    }
  };

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "running";
    return "pending";
  };

  return (
    <div className="bg-surface rounded-xl border border-surface-tertiary p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Analysis Progress
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm text-text-secondary">
            {isAnalyzing ? "Analyzing..." : "Ready"}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {analysisSteps.map((step: AnalysisStep, index: number) => {
          const status = getStepStatus(index);
          return (
            <div
              key={step.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                status === "running"
                  ? "bg-surface-secondary border border-primary"
                  : status === "completed"
                    ? "bg-surface-secondary border border-success"
                    : "bg-surface border border-surface-tertiary"
              }`}
            >
              {getStepIcon(status)}
              <div>
                <div className="font-medium text-text-primary">{step.name}</div>
                <div className="text-sm text-text-secondary">{step.description}</div>
              </div>
              <div className="ml-auto">
                <span className={`text-xs font-semibold ${
                  status === "completed"
                    ? "text-success"
                    : status === "running"
                      ? "text-primary"
                      : "text-text-muted"
                }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisPanel;

