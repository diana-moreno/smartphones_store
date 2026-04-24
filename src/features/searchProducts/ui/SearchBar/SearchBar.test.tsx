import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './SearchBar';

const mockOnChange = vi.fn();

describe('SearchBar', () => {
  describe('Rendering', () => {
    it('should render the search input', () => {
      render(<SearchBar value="" onChange={mockOnChange} totalResults={0} />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('should show N results when totalResults > 0', () => {
      render(<SearchBar value="" onChange={mockOnChange} totalResults={12} />);
      expect(screen.getByText('12 results')).toBeInTheDocument();
    });

    it('should show 0 results when value has text and totalResults is 0', () => {
      render(
        <SearchBar value="xyz" onChange={mockOnChange} totalResults={0} />
      );
      expect(screen.getByText('0 results')).toBeInTheDocument();
    });

    it('should not show results text when value is empty and totalResults is 0', () => {
      render(<SearchBar value="" onChange={mockOnChange} totalResults={0} />);
      expect(screen.queryByText(/results/)).not.toBeInTheDocument();
    });

    it('should not show clear button when value is empty', () => {
      render(<SearchBar value="" onChange={mockOnChange} totalResults={0} />);
      expect(
        screen.queryByRole('button', { name: 'Clean search' })
      ).not.toBeInTheDocument();
    });

    it('should show clear button when value has text', () => {
      render(
        <SearchBar value="iphone" onChange={mockOnChange} totalResults={5} />
      );
      expect(
        screen.getByRole('button', { name: 'Clean search' })
      ).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onChange with typed text', async () => {
      const user = userEvent.setup();

      render(<SearchBar value="" onChange={mockOnChange} totalResults={0} />);

      await user.type(screen.getByRole('searchbox'), 'samsung');

      expect(mockOnChange).toHaveBeenCalledWith('s');
    });

    it('should call onChange with empty string when clear button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <SearchBar value="iphone" onChange={mockOnChange} totalResults={3} />
      );

      await user.click(screen.getByRole('button', { name: 'Clean search' }));

      expect(mockOnChange).toHaveBeenCalledWith('');
    });
  });
});
