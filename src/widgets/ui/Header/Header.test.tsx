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
      expect(screen.getByRole('link', { name: 'home' })).toBeInTheDocument();
    });

    it('should render the cart link with item count', () => {
      renderWithProviders(<Header />);
      expect(
        screen.getByRole('link', { name: /carrito/i })
      ).toBeInTheDocument();
    });

    it('should not show back link on home page', () => {
      renderWithProviders(<Header />, { initialPath: '/' });
      expect(
        screen.queryByRole('link', { name: /go back/i })
      ).not.toBeInTheDocument();
    });

    it('should show back link on product detail page', () => {
      renderWithProviders(<Header />, { initialPath: '/products/abc123' });
      expect(
        screen.getByRole('link', { name: /go back/i })
      ).toBeInTheDocument();
    });
  });
});
