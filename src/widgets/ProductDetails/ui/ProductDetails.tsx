import { useEffect, useState } from 'react';
import { getProductById } from '../../../entities/product';
import type { ProductDetail } from '../../../entities/product';
import { ProductSpecifications } from '../../../entities/product';
import { ProductPurchasePanel } from '../../ProductPurchasePanel';
import { SimilarProducts } from '../../SimilarProducts';
import { useLoading } from '../../../app/model/useLoading';
import styles from './ProductDetails.module.scss';

interface ProductDetailsProps {
  id: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ id }) => {
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id);
        setProductDetail(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unexpected error');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, setLoading]);

  if (error)
    return (
      <div className={styles.error}>
        <p role="alert">{error}</p>
      </div>
    );
  if (isLoading || !productDetail) return null;

  return (
    <div className={styles.wrapper}>
      <ProductPurchasePanel product={productDetail} />
      <ProductSpecifications productDetail={productDetail} />
      <SimilarProducts products={productDetail.similarProducts} />
    </div>
  );
};
