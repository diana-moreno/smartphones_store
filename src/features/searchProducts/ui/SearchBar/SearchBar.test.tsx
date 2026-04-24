import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  describe('Rendering', () => {
    it('should render the search input', () => {
      render(<SearchBar value="" onChange={vi.fn()} totalResults={0} />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('should show N results when totalResults > 0', () => {
      render(<SearchBar value="" onChange={vi.fn()} totalResults={12} />);
      expect(screen.getByText('12 results')).toBeInTheDocument();
    });

    it('should show 0 results when value has text and totalResults is 0', () => {
      render(<SearchBar value="xyz" onChange={vi.fn()} totalResults={0} />);
      expect(screen.getByText('0 results')).toBeInTheDocument();
    });

    it('should not show results text when value is empty and totalResults is 0', () => {
      render(<SearchBar value="" onChange={vi.fn()} totalResults={0} />);
      expect(screen.queryByText(/results/)).not.toBeInTheDocument();
    });

    it('should not show clear button when value is empty', () => {
      render(<SearchBar value="" onChange={vi.fn()} totalResults={0} />);
      expect(
        screen.queryByRole('button', { name: /limpiar/i })
      ).not.toBeInTheDocument();
    });

    it('should show clear button when value has text', () => {
      render(<SearchBar value="iphone" onChange={vi.fn()} totalResults={5} />);
      expect(
        screen.getByRole('button', { name: /limpiar/i })
      ).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onChange with typed text', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<SearchBar value="" onChange={onChange} totalResults={0} />);

      await user.type(screen.getByRole('searchbox'), 'samsung');

      expect(onChange).toHaveBeenCalledWith('s');
    });

    it('should call onChange with empty string when clear button is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<SearchBar value="iphone" onChange={onChange} totalResults={3} />);

      await user.click(screen.getByRole('button', { name: /limpiar/i }));

      expect(onChange).toHaveBeenCalledWith('');
    });
  });
});
