import { Routes, Route } from 'react-router-dom';
import { ProductsListPage } from '../pages/ProductsListPage';
import { ProductDetailPage } from '../pages/ProductDetailsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsListPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<p>Carrito (pendiente)</p>} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
};

export default AppRoutes;
