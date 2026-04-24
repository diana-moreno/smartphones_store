import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from './ProductCard';

const product = {
  id: 'p1',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 799,
  imageUrl: 'iphone.jpg',
};

describe('ProductCard', () => {
  it('should render brand, name and price', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('799 EUR')).toBeInTheDocument();
  });

  it('should render the product image with descriptive alt text', () => {
    render(<ProductCard product={product} />);

    expect(
      screen.getByRole('img', { name: 'Apple iPhone 15' })
    ).toHaveAttribute('src', 'iphone.jpg');
  });
});
