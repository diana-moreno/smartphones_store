import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RemoveFromCartButton } from './RemoveFromCartButton';

const mockRemoveItem = vi.fn();

vi.mock('../../../../entities/cart/model/useCart', () => ({
  useCart: () => ({ removeItem: mockRemoveItem }),
}));

describe('RemoveFromCartButton', () => {
  beforeEach(() => {
    mockRemoveItem.mockClear();
  });

  describe('Rendering', () => {
    it('should render a button', () => {
      render(<RemoveFromCartButton itemId="item-1" />);
      expect(
        screen.getByRole('button', { name: 'Remove from cart' })
      ).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call removeItem with the itemId when clicked', async () => {
      const user = userEvent.setup();

      render(<RemoveFromCartButton itemId="item-1" />);

      await user.click(screen.getByRole('button', { name: 'Remove from cart' }));

      expect(mockRemoveItem).toHaveBeenCalledWith('item-1');
    });
  });
});
