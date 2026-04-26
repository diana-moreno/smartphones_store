import type { ReactNode } from 'react';
import styles from './CartItem.module.scss';
import type { ItemInCart } from '../../../product/@x/cart';

interface CartItemProps {
  item: ItemInCart;
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
        <p className={styles.name}>{item.name}</p>
        <p className={styles.specs}>
          {item.storage.capacity} | {item.color.name}
        </p>
        <p className={styles.price}>{item.price} EUR</p>
        {action}
      </div>
    </article>
  );
};
