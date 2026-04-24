import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductDetails } from './ProductDetails';
import { renderWithProviders } from '../../../shared/test/renderWithProviders';

vi.mock('../../../entities/product/api/productApi', () => ({
  getProductById: vi.fn(),
}));

vi.mock('../ProductPurchasePanel/ProductPurchasePanel', () => ({
  ProductPurchasePanel: () => <div>ProductPurchasePanel</div>,
}));

vi.mock(
  '../../../entities/product/ui/ProductSpecifications/ProductSpecifications',
  () => ({
    ProductSpecifications: () => <div>ProductSpecifications</div>,
  })
);

vi.mock('../SimilarProducts/SimilarProducts', () => ({
  SimilarProducts: () => <div>SimilarProducts</div>,
}));

import { getProductById } from '../../../entities/product/api/productApi';

const mockGetProductById = vi.mocked(getProductById);

const productDetail = {
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
  colorOptions: [],
  storageOptions: [],
  similarProducts: [],
};

describe('ProductDetails', () => {
  it('should render all three subcomponents after loading', async () => {
    mockGetProductById.mockResolvedValue(productDetail);

    renderWithProviders(<ProductDetails id="p1" />);

    await waitFor(() => {
      expect(screen.getByText('ProductPurchasePanel')).toBeInTheDocument();
      expect(screen.getByText('ProductSpecifications')).toBeInTheDocument();
      expect(screen.getByText('SimilarProducts')).toBeInTheDocument();
    });
  });

  it('should show an error message when the API fails', async () => {
    mockGetProductById.mockRejectedValue(new Error('Product not found'));

    renderWithProviders(<ProductDetails id="bad-id" />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Product not found');
    });
  });

  it('should render nothing while loading', () => {
    mockGetProductById.mockReturnValue(new Promise(() => {}));

    renderWithProviders(<ProductDetails id="p1" />);

    expect(screen.queryByText('ProductPurchasePanel')).not.toBeInTheDocument();
  });
});
