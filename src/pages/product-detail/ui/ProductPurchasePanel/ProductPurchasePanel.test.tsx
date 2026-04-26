import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProductPurchasePanel } from './ProductPurchasePanel';

vi.mock('@/features/add-to-cart', () => ({
  AddToCartButton: () => <button>Add</button>,
}));

const product = {
  id: 'p1',
  brand: 'Apple',
  name: 'iPhone 15',
  description: '',
  basePrice: 799,
  rating: 4.5,
  specs: {
    screen: '6.1"',
    resolution: '2556x1179',
    processor: 'A16',
    mainCamera: '48MP',
    selfieCamera: '12MP',
    battery: '3279mAh',
    os: 'iOS 17',
    screenRefreshRate: '60Hz',
  },
  colorOptions: [
    { name: 'Black', hexCode: '#000000', imageUrl: 'black.jpg' },
    { name: 'White', hexCode: '#ffffff', imageUrl: 'white.jpg' },
  ],
  storageOptions: [
    { capacity: '128GB', price: 799 },
    { capacity: '256GB', price: 899 },
  ],
  similarProducts: [],
};

describe('ProductPurchasePanel', () => {
  describe('Rendering', () => {
    it('should display the product name', () => {
      render(<ProductPurchasePanel product={product} />);
      expect(
        screen.getByRole('heading', { name: 'iPhone 15' })
      ).toBeInTheDocument();
    });

    it('should show "From X EUR" when no storage is selected', () => {
      render(<ProductPurchasePanel product={product} />);
      expect(screen.getByText('From 799 EUR')).toBeInTheDocument();
    });

    it('should show the exact price when both color and storage are selected', async () => {
      const user = userEvent.setup();
      render(<ProductPurchasePanel product={product} />);

      await user.click(screen.getByRole('button', { name: '256GB' }));
      await user.click(screen.getByRole('button', { name: 'White' }));

      expect(screen.getByText('899 EUR')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should update the price when a different storage is selected', async () => {
      const user = userEvent.setup();
      render(<ProductPurchasePanel product={product} />);

      await user.click(screen.getByRole('button', { name: 'Black' }));

      await user.click(screen.getByRole('button', { name: '128GB' }));
      expect(screen.getByText('799 EUR')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: '256GB' }));
      expect(screen.getByText('899 EUR')).toBeInTheDocument();
    });
  });
});
