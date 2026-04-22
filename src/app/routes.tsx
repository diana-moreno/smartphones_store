import { Routes, Route } from 'react-router-dom';
import { ProductsListPage } from '../pages/ProductsListPage';
import { ProductDetailPage } from '../pages/ProductDetailsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsListPage />} />
      <Route path="/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<p>Carrito (pendiente)</p>} />
    </Routes>
  );
};

export default AppRoutes;
