import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { ProductsListPage } from '../pages/ProductsListPage';
import { ProductDetailPage } from '../pages/ProductDetailsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductsListPage />} />
        <Route path="/cart" element={<p>Carrito (pendiente)</p>} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
