import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import type { ProductSummary } from '../model/product';

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
