import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useLoading } from './useLoading';

describe('useLoading', () => {
  it('should throw when used outside LoadingProvider', () => {
    expect(() => renderHook(() => useLoading())).toThrow(
      'useLoading must be used within a LoadingProvider'
    );
  });
});
