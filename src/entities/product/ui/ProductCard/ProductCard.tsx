import { Suspense } from 'react';
import type { ProductSummary } from '../../model/product';
import { readTrimmedImage } from '../../../../shared/lib/trimImageUrl';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: ProductSummary;
}

const TrimmedImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const trimmedSrc = readTrimmedImage(src);
  return <img src={trimmedSrc} alt={alt} className={styles.image} />;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Suspense
          fallback={<div className={styles.imageSkeleton}>Loading...</div>}
        >
          <TrimmedImage
            src={product.imageUrl}
            alt={`${product.brand} ${product.name}`}
          />
        </Suspense>
      </div>
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
