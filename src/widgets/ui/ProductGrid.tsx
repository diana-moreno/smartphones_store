import { useEffect, useState } from 'react';
import { getProducts } from '../../entities/product/api/productApi';
import type { ProductSummary } from '../../entities/product/model/product';
import { ProductList } from '../../entities/product/ui/ProductList';
import { SearchBar } from '../../features/searchProducts/ui/SearchBar';

const DEBOUNCE_MS = 300;

export const ProductGrid: React.FC = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts(search, controller.signal);
        setProducts(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error inesperado');
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search]);

  return (
    <section>
      <SearchBar value={search} onChange={setSearch} />
      {error && <p role="alert">{error}</p>}
      {!loading && !error && <ProductList products={products} />}
    </section>
  );
};
