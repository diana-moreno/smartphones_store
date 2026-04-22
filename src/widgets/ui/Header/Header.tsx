import { Link } from 'react-router-dom';
import { useCart } from '../../../entities/cart/model/useCart';
import logo from '../../assets/logo.svg';
import bagIconInactive from '../../assets/bagIconInactive.svg';
import bagIconActive from '../../assets/bagIconActive.svg';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { count } = useCart();
  const hasItems = count > 0;

  return (
    <header className={styles.header}>
      <Link to="/" aria-label="home">
        <img src={logo} alt="Smartphones store" />
      </Link>
      <Link
        to="/cart"
        aria-label={`Carrito, ${count} productos`}
        className={styles.cartLink}
      >
        <img src={hasItems ? bagIconActive : bagIconInactive} alt="bag icon" />
        <span aria-hidden="true" className={styles.cartCount}>
          {count}
        </span>
      </Link>
    </header>
  );
};
