'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { logError } from '@/utils/error-logging';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-red-600">出现了一些问题</h2>
          <p className="mt-2 text-gray-600">{this.state.error?.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 