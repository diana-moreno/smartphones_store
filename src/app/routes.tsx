import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<p>Home (pendiente)</p>} />
      <Route path="/products/:id" element={<p>Detalle (pendiente)</p>} />
      <Route path="/cart" element={<p>Carrito (pendiente)</p>} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
};

export default AppRoutes;
