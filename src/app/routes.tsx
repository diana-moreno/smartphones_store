import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { ProductsListPage } from '../pages/ProductsListPage';
import { ProductDetailPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductsListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
