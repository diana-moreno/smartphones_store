import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RemoveFromCartButton } from './RemoveFromCartButton';

const mockRemoveItem = vi.fn();

vi.mock('../../../../entities/cart/model/useCart', () => ({
  useCart: () => ({ removeItem: mockRemoveItem }),
}));

describe('RemoveFromCartButton', () => {
  describe('Rendering', () => {
    it('should render a button', () => {
      render(<RemoveFromCartButton itemId="item-1" />);
      expect(
        screen.getByRole('button', { name: 'Eliminar' })
      ).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call removeItem with the itemId when clicked', async () => {
      const user = userEvent.setup();
      mockRemoveItem.mockClear();
      render(<RemoveFromCartButton itemId="item-1" />);

      await user.click(screen.getByRole('button', { name: 'Eliminar' }));

      expect(mockRemoveItem).toHaveBeenCalledWith('item-1');
    });
  });
});
