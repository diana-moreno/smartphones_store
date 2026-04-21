import { Link } from 'react-router-dom';
import type { ProductSummary } from '../../model/product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

interface ProductListProps {
  products: ProductSummary[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.id} className={styles.item}>
          <Link to={`/products/${product.id}`} className={styles.link}>
            <ProductCard product={product} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
