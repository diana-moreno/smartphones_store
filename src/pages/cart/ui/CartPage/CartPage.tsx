import { Link } from 'react-router-dom';
import { CartItem, useCart } from '@/entities/cart';
import { RemoveFromCartButton } from '@/features/remove-from-cart';
import { Button } from '@/shared/ui';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
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
        {/* mobile */}
        {count > 0 && (
          <p className={styles.totalMobile}>
            <span>Total</span>
            <span>{totalPrice} EUR</span>
          </p>
        )}

        <Link
          to="/"
          className={`${styles.continueLink} ${!count ? styles.noPay : ''}`}
        >
          Continue shopping
        </Link>

        {count > 0 && (
          <>
            {/* mobile */}
            <div className={styles.pay}>
              <Button ariaLabel="Pay for your order" onClick={() => {}}>
                Pay
              </Button>
            </div>

            {/* tablet + desktop */}
            <div className={styles.payWrapper}>
              <p className={styles.totalDesktop}>
                <span>Total</span>
                <span>{totalPrice} EUR</span>
              </p>
              <div className={styles.payDesktop}>
                <Button ariaLabel="Pay for your order" onClick={() => {}}>
                  Pay
                </Button>
              </div>
            </div>
          </>
        )}
      </footer>
    </section>
  );
};
