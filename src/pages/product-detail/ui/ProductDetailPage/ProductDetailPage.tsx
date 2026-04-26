import { useParams } from 'react-router-dom';
import { useFetchProduct } from '../../model/useFetchProduct';
import { ProductPurchasePanel } from '../ProductPurchasePanel/ProductPurchasePanel';
import { ProductSpecifications } from '../ProductSpecifications/ProductSpecifications';
import { SimilarProducts } from '../SimilarProducts/SimilarProducts';
import styles from './ProductDetailPage.module.scss';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { error, isLoading, productDetail } = useFetchProduct(id);

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
