import React, { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  errorFallback?: ReactNode;
  loadingFallback?: ReactNode;
  children: ReactNode; // children 프로퍼티의 타입 정의
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error occurred:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.errorFallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
