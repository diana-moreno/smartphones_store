import type { ReactNode } from 'react';
import type { CartItem as CartItemModel } from '../model/cartItem';

interface CartItemProps {
  item: CartItemModel;
  action?: ReactNode;
}

export const CartItem: React.FC<CartItemProps> = ({ item, action }) => {
  return (
    <article>
      <img
        src={item.imageUrl}
        alt={`${item.name} en color ${item.color.name}`}
      />
      <div>
        <h3>{item.name}</h3>
        <p>
          <span>{item.storage.capacity}</span>
          <span> | </span>
          <span>{item.color.name}</span>
        </p>
        <p>{item.price} EUR</p>
      </div>
      {action}
    </article>
  );
};
