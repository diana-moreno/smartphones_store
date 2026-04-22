import { useEffect, useState } from 'react';
import { getProductById } from '../../entities/product/api/productApi';
import type { ProductDetail } from '../../entities/product/model/product';
import { ProductSpecifications } from '../../entities/product/ui/ProductSpecifications/ProductSpecifications';
import { ProductPurchasePanel } from './ProductPurchasePanel/ProductPurchasePanel';
import { SimilarProducts } from './SimilarProducts/SimilarProducts';
import { useLoading } from '../../app/loading/useLoading';

interface ProductDetailsProps {
  id: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ id }) => {
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startTask, stopTask } = useLoading();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      startTask();
      try {
        const data = await getProductById(id);
        setProductDetail(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error inesperado');
      } finally {
        setLoading(false);
        stopTask();
      }
    })();
  }, [id, startTask, stopTask]);

  if (loading || !productDetail) return null;
  if (error) return <p role="alert">{error}</p>;

  return (
    <>
      <ProductPurchasePanel product={productDetail} />
      <ProductSpecifications productDetail={productDetail} />
      <SimilarProducts products={productDetail.similarProducts} />
    </>
  );
};
