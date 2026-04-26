import { Link } from 'react-router-dom';
import type { ProductSummary } from '@/entities/product';
import { ProductCard } from '@/entities/product';
import styles from './ProductGrid.module.scss';

interface ProductGridProps {
  products: ProductSummary[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.id} className={styles.item}>
          <Link
            to={`/products/${product.id}`}
            aria-label={`Go to product ${product.name} details`}
            className={styles.link}
          >
            <ProductCard product={product} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
