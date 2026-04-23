import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../../entities/cart/model/useCart';
import logo from '../../assets/logo.svg';
import bagIconInactive from '../../assets/bagIconInactive.svg';
import bagIconActive from '../../assets/bagIconActive.svg';
import backArrow from '../../assets/backArrow.svg';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { count } = useCart();
  const hasItems = count > 0;

  const { pathname } = useLocation();
  const showBack = pathname.includes('/products/');

  return (
    <header>
      <nav className={styles.navBar}>
        <Link to="/" aria-label="home">
          <img src={logo} alt="Smartphones store" />
        </Link>
        <Link
          to="/cart"
          aria-label={`Carrito, ${count} productos`}
          className={styles.cartLink}
        >
          <img src={hasItems ? bagIconActive : bagIconInactive} alt="" />
          <span aria-hidden="true" className={styles.cartCount}>
            {count}
          </span>
        </Link>
      </nav>

      {showBack && (
        <Link
          to="/"
          aria-label={`Go back to home`}
          className={styles.goBackLink}
        >
          <img src={backArrow} alt="" />
          <span aria-hidden="true" className={styles.goBackText}>
            Back
          </span>
        </Link>
      )}
    </header>
  );
};
