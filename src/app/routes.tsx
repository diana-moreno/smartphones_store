import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { ProductsListPage } from '../pages/ProductsListPage';
import { ProductDetailPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductsListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
