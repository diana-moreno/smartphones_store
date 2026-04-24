import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AddToCartButton } from './AddToCartButton';

const mockAddItem = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../../../entities/cart/model/useCart', () => ({
  useCart: () => ({ addItem: mockAddItem }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('uuid', () => ({
  v4: () => 'test-uuid',
}));

const product = {
  id: 'p1',
  name: 'iPhone 15',
  brand: 'Apple',
  description: '',
  basePrice: 799,
  rating: 4.5,
  specs: {} as never,
  colorOptions: [],
  storageOptions: [],
  similarProducts: [],
};

const selectedColor = {
  name: 'Black',
  hexCode: '#000000',
  imageUrl: 'black.jpg',
};

const selectedStorage = {
  capacity: '128GB',
  price: 799,
};

describe('AddToCartButton', () => {
  beforeEach(() => {
    mockAddItem.mockClear();
    mockNavigate.mockClear();
  });

  describe('Rendering', () => {
    it('should be disabled when selectedColor is missing', () => {
      render(
        <AddToCartButton product={product} selectedStorage={selectedStorage} />
      );

      expect(screen.getByRole('button', { name: 'Añadir' })).toBeDisabled();
    });

    it('should be disabled when selectedStorage is missing', () => {
      render(
        <AddToCartButton product={product} selectedColor={selectedColor} />
      );

      expect(screen.getByRole('button', { name: 'Añadir' })).toBeDisabled();
    });

    it('should be enabled when both color and storage are selected', () => {
      render(
        <AddToCartButton
          product={product}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
        />
      );

      expect(screen.getByRole('button', { name: 'Añadir' })).toBeEnabled();
    });
  });

  describe('User Interactions', () => {
    it('should call addItem with the correct data when clicked', async () => {
      const user = userEvent.setup();
      render(
        <AddToCartButton
          product={product}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Añadir' }));

      expect(mockAddItem).toHaveBeenCalledWith({
        id: 'test-uuid',
        productId: 'p1',
        name: 'iPhone 15',
        imageUrl: 'black.jpg',
        color: { name: 'Black', hexCode: '#000000' },
        storage: { capacity: '128GB' },
        price: 799,
      });
    });

    it('should navigate to /cart after adding the item', async () => {
      const user = userEvent.setup();
      render(
        <AddToCartButton
          product={product}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Añadir' }));

      expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });
  });
});
