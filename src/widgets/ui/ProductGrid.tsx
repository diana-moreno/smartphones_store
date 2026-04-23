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
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts(search, MAX_PRODUCTS, controller.signal);
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
  }, [search, setLoading]);

  return (
    <section>
      <SearchBar value={search} onChange={setSearch} totalResults={products.length} />
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && <ProductList products={products} />}
    </section>
  );
};
