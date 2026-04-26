import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { CartContext } from './cartContext';
import type { ItemInCart } from '../../product/@x/cart';

interface CartProviderProps {
  children: ReactNode;
}

const LS_KEY = 'cart';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const stored = localStorage.getItem(LS_KEY);
  const [items, setItems] = useState<ItemInCart[]>(
    stored ? JSON.parse(stored) : []
  );

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: ItemInCart) => {
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
