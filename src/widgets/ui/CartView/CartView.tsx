import { Link } from 'react-router-dom';
import { useCart } from '../../../entities/cart/model/useCart';
import { CartItem } from '../../../entities/cart/ui/CartItem';
import { RemoveFromCartButton } from '../../../features/removeFromCart/ui/RemoveFromCartButton/RemoveFromCartButton';
import { Button } from '../../../shared/ui/Button/Button';
import styles from './CartView.module.scss';

export const CartView: React.FC = () => {
  const { items, count, totalPrice } = useCart();

  return (
    <section className={styles.cart}>
      <h1 className={styles.title}>Cart ({count})</h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <CartItem
              item={item}
              action={<RemoveFromCartButton itemId={item.id} />}
            />
          </li>
        ))}
      </ul>

      <footer className={styles.footer}>
        <Link
          to="/"
          className={`${styles.continueLink} ${!count ? styles.noPay : ''}`}
        >
          Continue shopping
        </Link>
        {count > 0 && (
          <div className={styles.payWrapper}>
            <p className={styles.total}>
              <span>Total</span>
              <span>{totalPrice} EUR</span>
            </p>
            <div className={styles.pay}>
              <Button onClick={() => {}}>Pay</Button>
            </div>
          </div>
        )}
      </footer>
    </section>
  );
};
