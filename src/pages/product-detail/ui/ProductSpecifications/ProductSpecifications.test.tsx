import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProductSpecifications } from './ProductSpecifications';

const productDetail = {
  id: 'p1',
  brand: 'Apple',
  name: 'iPhone 15',
  description: 'A great phone',
  basePrice: 799,
  rating: 4.5,
  specs: {
    screen: '6.1"',
    resolution: '2556x1179',
    processor: 'A16 Bionic',
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

describe('ProductSpecifications', () => {
  it('should render the specifications heading', () => {
    render(<ProductSpecifications productDetail={productDetail} />);
    expect(
      screen.getByRole('heading', { name: 'Specifications' })
    ).toBeInTheDocument();
  });

  it('should render all spec values', () => {
    render(<ProductSpecifications productDetail={productDetail} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('A great phone')).toBeInTheDocument();
    expect(screen.getByText('6.1"')).toBeInTheDocument();
    expect(screen.getByText('A16 Bionic')).toBeInTheDocument();
    expect(screen.getByText('iOS 17')).toBeInTheDocument();
  });
});
