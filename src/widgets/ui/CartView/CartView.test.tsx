import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartView } from './CartView';
import { renderWithProviders } from '../../../shared/test/renderWithProviders';

vi.mock('../../../entities/cart', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../../entities/cart')>();
  return { ...actual, useCart: () => mockCartState };
});

vi.mock(
  '../../../features/removeFromCart/ui/RemoveFromCartButton/RemoveFromCartButton',
  () => ({
    RemoveFromCartButton: () => <button>Remove item</button>,
  })
);

const emptyCartItem = {
  id: '',
  productId: '',
  name: '',
  imageUrl: 'img.jpg',
  color: { name: '', hexCode: '' },
  storage: { capacity: '' },
  price: 0,
};

let mockCartState = { items: [emptyCartItem], count: 0, totalPrice: 0 };

const cartItem = {
  id: 'item-1',
  productId: 'p1',
  name: 'iPhone 15',
  imageUrl: 'img.jpg',
  color: { name: 'Black', hexCode: '#000' },
  storage: { capacity: '128GB' },
  price: 799,
};

describe('CartView', () => {
  describe('Rendering with empty cart', () => {
    beforeEach(() => {
      mockCartState = { items: [emptyCartItem], count: 0, totalPrice: 0 };
    });

    it('should show Cart (0) in title', () => {
      renderWithProviders(<CartView />);
      expect(
        screen.getByRole('heading', { name: 'Cart (0)' })
      ).toBeInTheDocument();
    });

    it('should not show total price or pay button', () => {
      renderWithProviders(<CartView />);
      expect(screen.queryByText('0 EUR')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Pay for your order' })
      ).not.toBeInTheDocument();
    });

    it('should show continue shopping link', () => {
      renderWithProviders(<CartView />);
      expect(
        screen.getByRole('link', { name: 'Continue shopping' })
      ).toBeInTheDocument();
    });
  });

  describe('Rendering with items', () => {
    beforeEach(() => {
      mockCartState = { items: [cartItem], count: 1, totalPrice: 799 };
    });

    it('should show Cart (1) in title', () => {
      renderWithProviders(<CartView />);
      expect(
        screen.getByRole('heading', { name: 'Cart (1)' })
      ).toBeInTheDocument();
    });

    it('should show total price', () => {
      renderWithProviders(<CartView />);
      // there are few total price elements (mobile and tablet/desktop)
      expect(screen.getAllByText('799 EUR').length).toBeGreaterThan(0);
    });

    it('should show pay button', () => {
      renderWithProviders(<CartView />);
      // there are few total pay buttons (mobile and tablet/desktop)
      expect(
        screen.getAllByRole('button', { name: 'Pay for your order' }).length
      ).toBeGreaterThan(0);
    });

    it('should render a list item for each cart item', () => {
      renderWithProviders(<CartView />);
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    });
  });
});
