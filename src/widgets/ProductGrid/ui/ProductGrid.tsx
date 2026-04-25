import { useEffect, useRef, useState } from 'react';
import { getProducts } from '../../../entities/product';
import type { ProductSummary } from '../../../entities/product';
import { ProductList } from '../../../entities/product';
import { SearchBar } from '../../../features/searchProducts';
import { useLoading } from '../../../app/model/useLoading';
import styles from './ProductGrid.module.scss';

const DEBOUNCE_MS = 300;
const MAX_PRODUCTS = 20;

export const ProductGrid: React.FC = () => {
  const [search, setSearch] = useState('');
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

  return (
    <section>
      <div className={styles.searchWrapper}>
        <SearchBar
          value={search}
          onChange={setSearch}
          totalResults={products.length}
        />
      </div>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      {!isLoading && !error && <ProductList products={products} />}
    </section>
  );
};
