import { Link } from 'react-router-dom';
import type { ProductSummary } from '../model/product';
import { ProductCard } from './ProductCard/ProductCard';

interface ProductListProps {
  products: ProductSummary[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
