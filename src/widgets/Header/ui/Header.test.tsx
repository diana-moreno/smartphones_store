import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';
import { renderWithProviders } from '../../../shared/test/renderWithProviders';

vi.mock('../../../entities/cart/model/useCart', () => ({
  useCart: () => ({ count: 0 }),
}));

describe('Header', () => {
  describe('Rendering', () => {
    it('should render the home link', () => {
      renderWithProviders(<Header />);
      expect(
        screen.getByRole('link', { name: 'Go to home' })
      ).toBeInTheDocument();
    });

    it('should render the cart link with item count', () => {
      renderWithProviders(<Header />);
      expect(
        screen.getByRole('link', { name: 'Go to cart, 0 products' })
      ).toBeInTheDocument();
    });

    it('should not show back link on home page', () => {
      renderWithProviders(<Header />, { initialPath: '/' });
      expect(
        screen.queryByRole('link', { name: 'Go back to home' })
      ).not.toBeInTheDocument();
    });

    it('should show Go back to home link on product detail page', () => {
      renderWithProviders(<Header />, { initialPath: '/products/abc123' });
      expect(
        screen.getByRole('link', { name: 'Go back to home' })
      ).toBeInTheDocument();
    });
  });
});
