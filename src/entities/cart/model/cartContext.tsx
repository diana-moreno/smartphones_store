import { createContext } from 'react';
import type { CartItem } from './cartItem';

export interface CartContextValue {
  items: CartItem[];
  count: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
