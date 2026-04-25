import AppRoutes from './routes';
import { CartProvider } from '../entities/cart';
import { LoadingProvider } from './model/LoadingProvider';

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
