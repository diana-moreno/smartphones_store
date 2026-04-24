import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { StorageSelector } from './StorageSelector';

const options = [
  { capacity: '128GB', price: 799 },
  { capacity: '256GB', price: 899 },
];

describe('StorageSelector', () => {
  describe('Rendering', () => {
    it('should render a button for each storage option', () => {
      render(
        <StorageSelector
          options={options}
          selected={null}
          onChange={vi.fn()}
          label="Storage"
        />
      );

      expect(screen.getByRole('button', { name: '128GB' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '256GB' })).toBeInTheDocument();
    });

    it('should mark the selected button as pressed', () => {
      render(
        <StorageSelector
          options={options}
          selected="256GB"
          onChange={vi.fn()}
          label="Storage"
        />
      );

      expect(screen.getByRole('button', { name: '256GB' })).toHaveAttribute(
        'aria-pressed',
        'true'
      );
      expect(screen.getByRole('button', { name: '128GB' })).toHaveAttribute(
        'aria-pressed',
        'false'
      );
    });
  });

  describe('User Interactions', () => {
    it('should call onChange with the capacity when a button is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <StorageSelector
          options={options}
          selected={null}
          onChange={onChange}
          label="Storage"
        />
      );

      await user.click(screen.getByRole('button', { name: '128GB' }));

      expect(onChange).toHaveBeenCalledWith('128GB');
    });
  });
});
