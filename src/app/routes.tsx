import { Route, Routes } from 'react-router-dom';
import { CartPage } from '../pages/cart';
import { NotFoundPage } from '../pages/not-found';
import { ProductDetailPage } from '../pages/product-detail';
import { ProductListPage } from '../pages/product-list';
import { Layout } from './layout/Layout/Layout';

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
