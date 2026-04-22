import { useEffect, useState } from 'react';
import { getProductById } from '../../entities/product/api/productApi';
import type { ProductDetail } from '../../entities/product/model/product';
import { ProductSpecifications } from '../../entities/product/ui/ProductSpecifications/ProductSpecifications';
import { ProductPurchasePanel } from './ProductPurchasePanel/ProductPurchasePanel';
import { SimilarProducts } from './SimilarProducts/SimilarProducts';

interface ProductDetailsProps {
  id: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ id }) => {
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id);
        setProductDetail(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error inesperado');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return null;
  if (error) return <p role="alert">{error}</p>;
  if (!productDetail) return null;

  return (
    <>
      <ProductPurchasePanel product={productDetail} />
      <ProductSpecifications productDetail={productDetail} />
      <SimilarProducts products={productDetail.similarProducts} />
    </>
  );
};
