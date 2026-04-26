import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ColorSelector } from './ColorSelector';

const options = [
  { name: 'Black', hexCode: '#000000', imageUrl: 'black.jpg' },
  { name: 'White', hexCode: '#ffffff', imageUrl: 'white.jpg' },
];

describe('ColorSelector', () => {
  describe('Rendering', () => {
    it('should render a button for each color option', () => {
      render(
        <ColorSelector
          options={options}
          selected={null}
          onChange={vi.fn()}
          label="Color"
        />
      );

      expect(screen.getByRole('button', { name: 'Black' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'White' })).toBeInTheDocument();
    });

    it('should mark the selected button as pressed', () => {
      render(
        <ColorSelector
          options={options}
          selected="Black"
          onChange={vi.fn()}
          label="Color"
        />
      );

      expect(screen.getByRole('button', { name: 'Black' })).toHaveAttribute(
        'aria-pressed',
        'true'
      );
      expect(screen.getByRole('button', { name: 'White' })).toHaveAttribute(
        'aria-pressed',
        'false'
      );
    });

    it('should display the selected color name', () => {
      render(
        <ColorSelector
          options={options}
          selected="White"
          onChange={vi.fn()}
          label="Color"
        />
      );

      expect(screen.getByText('White')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onChange with the color name when a button is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <ColorSelector
          options={options}
          selected={null}
          onChange={onChange}
          label="Color"
        />
      );

      await user.click(screen.getByRole('button', { name: 'Black' }));

      expect(onChange).toHaveBeenCalledWith('Black');
    });
  });
});
