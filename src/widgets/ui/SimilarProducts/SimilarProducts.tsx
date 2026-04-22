import { Link } from 'react-router-dom';
import type { ProductSummary } from '../../../entities/product/model/product';
import { ProductCard } from '../../../entities/product/ui/ProductCard/ProductCard';
import styles from './SimilarProducts.module.scss';

interface SimilarProductsProps {
  products: ProductSummary[];
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  products,
}) => {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="similar-heading">
      <h2 id="similar-heading" className={styles.title}>
        Similar items
      </h2>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.id} className={styles.item}>
            <Link to={`/products/${product.id}`} className={styles.link}>
              <ProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
