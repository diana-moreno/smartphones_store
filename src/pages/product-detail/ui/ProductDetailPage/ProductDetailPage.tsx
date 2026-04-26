import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoading } from '../../../../app/model/useLoading';
import type { ProductDetail as ProductDetailType } from '../../../../entities/product';
import { ProductPurchasePanel } from '../ProductPurchasePanel/ProductPurchasePanel';
import { ProductSpecifications } from '../ProductSpecifications/ProductSpecifications';
import { SimilarProducts } from '../SimilarProducts/SimilarProducts';
import styles from './ProductDetailPage.module.scss';
import { getProductById } from '../../api/productsApi';

export const ProductDetailPage: React.FC = () => {
  const [productDetail, setProductDetail] = useState<ProductDetailType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setLoading } = useLoading();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
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
