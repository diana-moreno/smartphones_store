import { createContext } from 'react';

export interface LoadingContextValue {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextValue | null>(null);
