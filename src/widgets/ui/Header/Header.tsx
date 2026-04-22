import { Link } from 'react-router-dom';
import { useCart } from '../../../entities/cart/model/useCart';
import logo from '../../assets/logo.svg';
import bagIcon from '../../assets/bagIcon.svg';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { count } = useCart();

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
        <img src={bagIcon} alt="" />
        <span aria-hidden="true" className={styles.cartCount}>
          {count}
        </span>
      </Link>
    </header>
  );
};
