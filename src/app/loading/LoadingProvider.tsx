import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { LoadingContext } from './loadingContext';

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [count, setCount] = useState(0);

  const startTask = useCallback(() => setCount((c) => c + 1), []);
  const stopTask = useCallback(() => setCount((c) => Math.max(0, c - 1)), []);

  const value = {
    isLoading: count > 0,
    startTask,
    stopTask,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
