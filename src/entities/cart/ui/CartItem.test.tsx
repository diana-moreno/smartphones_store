import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartItem } from './CartItem';

const item = {
  id: 'item-1',
  productId: 'p1',
  name: 'iPhone 15',
  imageUrl: 'iphone.jpg',
  color: { name: 'Black', hexCode: '#000000' },
  storage: { capacity: '128GB' },
  price: 799,
};

describe('CartItem', () => {
  it('should render name, specs and price', () => {
    render(<CartItem item={item} />);

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('128GB | Black')).toBeInTheDocument();
    expect(screen.getByText('799 EUR')).toBeInTheDocument();
  });

  it('should render the product image with descriptive alt text', () => {
    render(<CartItem item={item} />);

    expect(
      screen.getByRole('img', { name: 'iPhone 15 en color Black' })
    ).toHaveAttribute('src', 'iphone.jpg');
  });

  it('should render the action slot when provided', () => {
    render(<CartItem item={item} action={<button>Eliminar</button>} />);

    expect(
      screen.getByRole('button', { name: 'Eliminar' })
    ).toBeInTheDocument();
  });
});
