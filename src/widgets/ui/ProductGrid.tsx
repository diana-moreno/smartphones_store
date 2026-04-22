import { useEffect, useState } from 'react';
import { getProducts } from '../../entities/product/api/productApi';
import type { ProductSummary } from '../../entities/product/model/product';
import { ProductList } from '../../entities/product/ui/ProductList/ProductList';
import { SearchBar } from '../../features/searchProducts/ui/SearchBar';
import { useLoading } from '../../app/loading/useLoading';

const DEBOUNCE_MS = 300;
const MAX_PRODUCTS = 20;

export const ProductGrid: React.FC = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startTask, stopTask } = useLoading();

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);
      startTask();
      try {
        const data = await getProducts(search, controller.signal);
        setProducts(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error inesperado');
      } finally {
        setLoading(false);
        stopTask();
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search, startTask, stopTask]);

  const visibleProducts = products.slice(0, MAX_PRODUCTS);

  return (
    <section>
      <SearchBar value={search} onChange={setSearch} />
      {error && <p role="alert">{error}</p>}
      {!loading && !error && <ProductList products={visibleProducts} />}
    </section>
  );
};
