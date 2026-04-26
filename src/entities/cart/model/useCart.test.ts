import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCart } from './useCart';

describe('useCart', () => {
  it('should throw when used outside CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within a CartProvider'
    );
  });
});
