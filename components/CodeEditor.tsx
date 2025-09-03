"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Upload, FileText } from "lucide-react";
import { useAudit } from "@/contexts/AuditContext";

const CodeEditor: React.FC = () => {
  const { state, setCode } = useAudit();
  const [code, setLocalCode] = useState(state.code);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setLocalCode(newCode);
    setCode(newCode);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">
          Smart Contract Code
        </h3>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-surface-tertiary hover:bg-surface-secondary rounded-lg text-text-secondary text-sm transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-surface-tertiary hover:bg-surface-secondary rounded-lg text-text-secondary text-sm transition-colors">
            <FileText className="w-4 h-4" />
            <span>Sample</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="bg-surface rounded-lg border border-surface-tertiary overflow-hidden">
          {/* Editor Header */}
          <div className="bg-surface-secondary px-4 py-2 border-b border-surface-tertiary">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-danger"></div>
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-text-muted text-sm ml-2">contract.sol</span>
            </div>
          </div>

          {/* Code Area */}
          <div className="relative">
            <textarea
              value={code}
              onChange={handleCodeChange}
              className="w-full h-48 bg-surface text-text-primary p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              placeholder="Paste your Solidity contract here..."
            />

            {/* Syntax Highlighting Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <SyntaxHighlighter
                language="solidity"
                style={tomorrow}
                customStyle={{
                  background: "transparent",
                  margin: 0,
                  padding: "1rem",
                  fontSize: "0.875rem",
                  fontFamily: "Fira Code, Monaco, Consolas, monospace",
                }}
                showLineNumbers
                wrapLines
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
