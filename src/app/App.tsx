import AppRoutes from './routes';
import { CartProvider } from '../entities/cart/model/cartContext';

const App = () => {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
};

export default App;
