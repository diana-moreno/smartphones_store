import AppRoutes from './routes';
import { CartProvider } from '../entities/cart/model/CartProvider';
import { LoadingProvider } from './loading/LoadingProvider';

const App = () => {
  return (
    <LoadingProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </LoadingProvider>
  );
};

export default App;
