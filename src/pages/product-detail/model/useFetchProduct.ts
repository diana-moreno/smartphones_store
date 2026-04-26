import { useEffect, useState } from 'react';
import { useLoading } from '../../../app/model/useLoading';
import type { ProductDetail } from '../../../entities/product';
import { getProductById } from '../api/productsApi';

export const useFetchProduct = (id?: string) => {
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setLoading } = useLoading();

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

  return { error, isLoading, productDetail };
};
