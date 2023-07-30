import React, { Suspense, ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

type Props = {
  errorFallback?: ReactNode;
  loadingFallback?: ReactNode;
  children: ReactNode;
};

const AsyncBoundary: React.FC<Props> = ({
  errorFallback = <></>,
  loadingFallback = <></>,
  children,
}) => {
  return (
    <ErrorBoundary errorFallback={errorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
