import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../../shared/test';
import { CartPage } from './CartPage';

vi.mock('../../../../entities/cart', async () => {
  return {
    ...(await vi.importActual('../../../../entities/cart')),
    useCart: () => mockCartState,
  };
});

vi.mock('../../../../features/remove-from-cart', () => ({
  RemoveFromCartButton: () => <button>Remove item</button>,
}));

const emptyCartItem = {
  id: 'empty-1',
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

describe('CartPage', () => {
  describe('Rendering with empty cart', () => {
    beforeEach(() => {
      mockCartState = { items: [emptyCartItem], count: 0, totalPrice: 0 };
    });

    it('should show Cart (0) in title', () => {
      renderWithProviders(<CartPage />);
      expect(
        screen.getByRole('heading', { name: 'Cart (0)' })
      ).toBeInTheDocument();
    });

    it('should not show total price or pay button', () => {
      renderWithProviders(<CartPage />);
      expect(screen.queryByText('0 EUR')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Pay for your order' })
      ).not.toBeInTheDocument();
    });

    it('should show continue shopping link', () => {
      renderWithProviders(<CartPage />);
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
      renderWithProviders(<CartPage />);
      expect(
        screen.getByRole('heading', { name: 'Cart (1)' })
      ).toBeInTheDocument();
    });

    it('should show total price', () => {
      renderWithProviders(<CartPage />);
      // there are few total price elements (mobile and tablet/desktop)
      expect(screen.getAllByText('799 EUR').length).toBeGreaterThan(0);
    });

    it('should show pay button', () => {
      renderWithProviders(<CartPage />);
      // there are few total pay buttons (mobile and tablet/desktop)
      expect(
        screen.getAllByRole('button', { name: 'Pay for your order' }).length
      ).toBeGreaterThan(0);
    });

    it('should render a list item for each cart item', () => {
      renderWithProviders(<CartPage />);
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    });
  });
});
