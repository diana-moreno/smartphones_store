import { useEffect, useState } from 'react';
import { getProducts } from '../../entities/product/api/productApi';
import type { ProductSummary } from '../../entities/product/model/product';
import { ProductList } from '../../entities/product/ui/ProductList/ProductList';
import { SearchBar } from '../../features/searchProducts/ui/SearchBar';
import { useLoading } from '../../app/loading/useLoading';
import styles from './ProductGrid.module.scss';

const DEBOUNCE_MS = 300;
const MAX_PRODUCTS = 20;

export const ProductGrid: React.FC = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
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
        setError(e instanceof Error ? e.message : 'Unexpected error');
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

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
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && <ProductList products={products} />}
    </section>
  );
};
