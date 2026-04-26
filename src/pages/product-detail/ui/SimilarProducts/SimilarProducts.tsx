import { Link } from 'react-router-dom';
import type { ProductSummary } from '@/entities/product';
import { ProductCard } from '@/entities/product';
import styles from './SimilarProducts.module.scss';

import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SimilarProductsProps {
  products: ProductSummary[];
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  products,
}) => {
  if (products.length === 0) return null;

  return (
    <section className={styles.list}>
      <h2 className={styles.title}>Similar items</h2>
      <Swiper
        modules={[Scrollbar]}
        spaceBetween={0}
        scrollbar={{ draggable: true }}
        slidesPerView={'auto'}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className={styles.item}>
            <Link
              aria-label={`Go to ${product.name} detail`}
              to={`/products/${product.id}`}
              className={styles.link}
            >
              <ProductCard product={product} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
