import type { ItemInCart } from '../../product/@x/cart';

export type Cart = {
  items: ItemInCart[];
  count: number;
  totalPrice: number;
};
