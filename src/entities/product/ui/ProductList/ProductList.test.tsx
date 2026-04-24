import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductList } from './ProductList';
import { renderWithProviders } from '../../../../shared/test/renderWithProviders';

const products = [
  {
    id: 'p1',
    brand: 'Apple',
    name: 'iPhone 15',
    basePrice: 799,
    imageUrl: 'img1.jpg',
  },
  {
    id: 'p2',
    brand: 'Samsung',
    name: 'Galaxy S24',
    basePrice: 699,
    imageUrl: 'img2.jpg',
  },
];

describe('ProductList', () => {
  describe('Rendering', () => {
    it('should render a link for each product', () => {
      renderWithProviders(<ProductList products={products} />);
      expect(
        screen.getByRole('link', { name: 'Go to product iPhone 15 details' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Go to product Galaxy S24 details' })
      ).toBeInTheDocument();
    });

    it('should link to the correct product detail URL', () => {
      renderWithProviders(<ProductList products={products} />);
      expect(
        screen.getByRole('link', { name: 'Go to product iPhone 15 details' })
      ).toHaveAttribute('href', '/products/p1');
    });

    it('should render an empty list when products is empty', () => {
      renderWithProviders(<ProductList products={[]} />);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });
});
