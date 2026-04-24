import type { ReactNode } from 'react';
import type { CartItem as CartItemModel } from '../model/cartItem';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemModel;
  action?: ReactNode;
}

export const CartItem: React.FC<CartItemProps> = ({ item, action }) => {
  return (
    <article className={styles.item}>
      <img
        src={item.imageUrl}
        alt={`${item.name} color ${item.color.name}`}
        className={styles.image}
      />
      <div>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.specs}>
          {item.storage.capacity} | {item.color.name}
        </p>
        <p className={styles.price}>{item.price} EUR</p>
        {action}
      </div>
    </article>
  );
};
