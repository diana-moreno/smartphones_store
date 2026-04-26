import { CartProvider } from '../entities/cart';
import { LoadingProvider } from './model/LoadingProvider';
import AppRoutes from './routes';

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
