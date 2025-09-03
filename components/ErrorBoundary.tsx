"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-surface-tertiary p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-danger" />
            </div>

            <h2 className="text-xl font-bold text-text-primary mb-2">
              Something went wrong
            </h2>

            <p className="text-text-secondary mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>

            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-text-muted cursor-pointer mb-2">
                  Error details
                </summary>
                <pre className="text-xs text-text-muted bg-surface-secondary p-3 rounded overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex space-x-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry</span>
              </button>

              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-surface-tertiary hover:bg-surface-secondary text-text-primary px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
