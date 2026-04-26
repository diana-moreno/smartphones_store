import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SimilarProducts } from './SimilarProducts';
import { renderWithProviders } from '../../../../shared/test/renderWithProviders';

vi.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/scrollbar', () => ({}));
vi.mock('swiper/modules', () => ({ Scrollbar: {} }));

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

describe('SimilarProducts', () => {
  it('should render nothing when products list is empty', () => {
    const { container } = renderWithProviders(
      <SimilarProducts products={[]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render the section heading when there are products', () => {
    renderWithProviders(<SimilarProducts products={products} />);
    expect(
      screen.getByRole('heading', { name: 'Similar items' })
    ).toBeInTheDocument();
  });

  it('should render a link for each product', () => {
    renderWithProviders(<SimilarProducts products={products} />);
    expect(
      screen.getByRole('link', { name: 'Go to iPhone 15 detail' })
    ).toHaveAttribute('href', '/products/p1');
    expect(
      screen.getByRole('link', { name: 'Go to Galaxy S24 detail' })
    ).toHaveAttribute('href', '/products/p2');
  });
});
