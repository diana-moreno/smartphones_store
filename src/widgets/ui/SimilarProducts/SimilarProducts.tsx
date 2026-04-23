import { Link } from 'react-router-dom';
import type { ProductSummary } from '../../../entities/product/model/product';
import { ProductCard } from '../../../entities/product/ui/ProductCard/ProductCard';
import styles from './SimilarProducts.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';

interface SimilarProductsProps {
  products: ProductSummary[];
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  products,
}) => {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="similar-heading" className={styles.list}>
      <h2 id="similar-heading" className={styles.title}>
        Similar items
      </h2>
      <Swiper
        modules={[Scrollbar]}
        spaceBetween={0}
        scrollbar={{ draggable: true }}
        // slidesPerView={5}
        slidesPerView={'auto'}
        // breakpoints={{
        //   // 0: { slidesPerView: 1 },
        //   393: { slidesPerView: 1 },
        //   834: { slidesPerView: 2 },
        //   1920: { slidesPerView: 3 },
        // }}
      >
        {products.map((product) => (
          <SwiperSlide>
            <li key={product.id} className={styles.item}>
              <Link to={`/products/${product.id}`} className={styles.link}>
                <ProductCard product={product} />
              </Link>
            </li>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
