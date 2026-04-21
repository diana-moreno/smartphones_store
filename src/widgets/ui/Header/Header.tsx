import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import bagIcon from '../../assets/bagIcon.svg';
import styles from './Header.module.scss';

interface HeaderProps {
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
  return (
    <header className={styles.header}>
      <Link to="/" aria-label="home">
        <img src={logo} alt="Smartphones store" />
      </Link>
      <Link
        to="/cart"
        aria-label={`Carrito, ${cartCount} productos`}
        className={styles.cartLink}
      >
        <img src={bagIcon} alt="" />
        <span aria-hidden="true" className={styles.cartCount}>
          {cartCount}
        </span>
      </Link>
    </header>
  );
};
