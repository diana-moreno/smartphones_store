import { createContext } from 'react';
import type { Cart } from './cartItem';
import type { ItemInCart } from '../../product/@x/cart';

export interface CartContextValue extends Cart {
  addItem: (item: ItemInCart) => void;
  removeItem: (id: string) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
