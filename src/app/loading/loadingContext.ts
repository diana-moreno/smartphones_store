import { createContext } from 'react';

export interface LoadingContextValue {
  isLoading: boolean;
  startTask: () => void;
  stopTask: () => void;
}

export const LoadingContext = createContext<LoadingContextValue | null>(null);
