import { useEffect, useRef, useState } from 'react';
import { useLoading } from '../../../app/model/useLoading';
import type { ProductSummary } from '../../../entities/product';
import { getProducts } from '../api/productsApi';

const DEBOUNCE_MS = 300;
const MAX_PRODUCTS = 20;

export const useFetchProducts = (search: string) => {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setLoading } = useLoading();
  const initial = useRef(true);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(
      async () => {
        setLoading(true);
        setError(null);

        try {
          const uniqueIds: string[] = [];
          const removeDuplicates = (products: ProductSummary[]) =>
            products.filter((p) => {
              if (uniqueIds.includes(p.id)) return false;
              uniqueIds.push(p.id);
              return true;
            });

          const firstResult = await getProducts(
            search,
            MAX_PRODUCTS,
            0,
            controller.signal
          );
          const uniqueProducts = removeDuplicates(firstResult);

          // We only make a second call to the API instead of a while loop because the API with offset returns the rest of the catalog
          if (uniqueProducts.length < MAX_PRODUCTS) {
            const secondResult = await getProducts(
              search,
              0,
              MAX_PRODUCTS,
              controller.signal
            );
            setProducts(
              [...uniqueProducts, ...removeDuplicates(secondResult)].slice(
                0,
                MAX_PRODUCTS
              )
            );
          } else {
            setProducts(uniqueProducts);
          }
        } catch (e) {
          if (e instanceof DOMException && e.name === 'AbortError') return;
          setError(e instanceof Error ? e.message : 'Unexpected error');
        } finally {
          setLoading(false);
          initial.current = false;
        }
      },
      // Skip debounce on first load
      initial.current ? 0 : DEBOUNCE_MS
    );

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search, setLoading]);

  return { error, isLoading, products };
};
