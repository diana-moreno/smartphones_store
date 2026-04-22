import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { CartContext } from './cartContext';
import type { CartItem } from './cartItem';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const stored = localStorage.getItem('cart');
  const [items, setItems] = useState<CartItem[]>(
    stored ? JSON.parse(stored) : []
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems([...items, item]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const value = {
    items,
    count: items.length,
    totalPrice: items.reduce((sum, item) => sum + item.price, 0),
    addItem,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
