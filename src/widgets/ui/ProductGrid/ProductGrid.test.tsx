import { screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductGrid } from './ProductGrid';
import { renderWithProviders } from '../../../shared/test/renderWithProviders';

vi.mock('../../../entities/product/api/productApi', () => ({
  getProducts: vi.fn(),
}));

vi.mock('../../../features/searchProducts/ui/SearchBar/SearchBar', () => ({
  SearchBar: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
    totalResults: number;
  }) => (
    <input
      aria-label="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

vi.mock('../../../entities/product/ui/ProductList/ProductList', () => ({
  ProductList: ({ products }: { products: { name: string }[] }) => (
    <ul>
      {products.map((p) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </ul>
  ),
}));

import { getProducts } from '../../../entities/product/api/productApi';

const mockGetProducts = vi.mocked(getProducts);

const makeProduct = (id: string, name: string) => ({
  id,
  brand: 'Brand',
  name,
  basePrice: 100,
  imageUrl: 'img.jpg',
});

describe('ProductGrid', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should show products after the debounce delay', async () => {
    mockGetProducts.mockResolvedValue([makeProduct('p1', 'iPhone 15')]);

    renderWithProviders(<ProductGrid />);
    await act(() => vi.advanceTimersByTimeAsync(300));

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
  });

  it('should show an error message when the API fails', async () => {
    mockGetProducts.mockRejectedValue(new Error('Network error'));

    renderWithProviders(<ProductGrid />);
    await act(() => vi.advanceTimersByTimeAsync(300));

    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
  });

  it('should pass the search term to the API after debounce', async () => {
    mockGetProducts.mockResolvedValue([]);

    renderWithProviders(<ProductGrid />);
    await act(() => vi.advanceTimersByTimeAsync(300));

    fireEvent.change(screen.getByRole('textbox', { name: 'search' }), {
      target: { value: 'samsung' },
    });
    await act(() => vi.advanceTimersByTimeAsync(300));

    expect(mockGetProducts).toHaveBeenCalledWith(
      'samsung',
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
  });

  it('should deduplicate products across both API calls', async () => {
    const firstBatch = Array.from({ length: 19 }, (_, i) =>
      makeProduct(`first-${i}`, `Phone ${i}`)
    );
    const duplicate = firstBatch[0];
    mockGetProducts
      .mockResolvedValueOnce(firstBatch)
      .mockResolvedValueOnce([duplicate, makeProduct('new-1', 'Galaxy S24')]);

    renderWithProviders(<ProductGrid />);
    await act(() => vi.advanceTimersByTimeAsync(300));

    expect(screen.getAllByText('Phone 0')).toHaveLength(1);
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
  });
});
