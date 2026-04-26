import { Routes, Route } from 'react-router-dom';
import { ProductListPage } from '../pages/product-list';
import { ProductDetailPage } from '../pages/product-detail';
import { CartPage } from '../pages/cart';
import { NotFoundPage } from '../pages/not-found';
import { Layout } from './layout/Layout/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
