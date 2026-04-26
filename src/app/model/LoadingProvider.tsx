import { useState } from 'react';
import type { ReactNode } from 'react';
import { LoadingContext } from './LoadingContext';

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(false);

  const value = { isLoading, setLoading };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
