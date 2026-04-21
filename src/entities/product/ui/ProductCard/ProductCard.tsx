import type { ProductSummary } from '../../model/product';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: ProductSummary;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article>
      <img
        src={product.imageUrl}
        alt={`${product.brand} ${product.name}`}
        className={styles.image}
      />
      <div className={styles.info}>
        <div>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.name}>{product.name}</p>
        </div>
        <p className={styles.price}>{product.basePrice} EUR</p>
      </div>
    </article>
  );
};
