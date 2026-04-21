import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import bagIcon from '../assets/bagIcon.svg';

interface HeaderProps {
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
  return (
    <header>
      <Link to="/" aria-label="home">
        <img src={logo} alt="Smartphones store" />
      </Link>
      <Link to="/cart" aria-label={`Carrito, ${cartCount} productos`}>
        <img src={bagIcon} alt="" />
        <span aria-hidden="true">{cartCount}</span>
      </Link>
    </header>
  );
};
