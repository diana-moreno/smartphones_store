import { useEffect, useState } from 'react';
import { getProducts } from '../../entities/product/api/productApi';
import type { ProductSummary } from '../../entities/product/model/product';
import { ProductList } from '../../entities/product/ui/ProductList/ProductList';
import { SearchBar } from '../../features/searchProducts/ui/SearchBar';

const DEBOUNCE_MS = 300;
const MAX_PRODUCTS = 20;

export const ProductGrid: React.FC = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setError(null);
      try {
        const data = await getProducts(search, controller.signal);
        setProducts(data.slice(0, MAX_PRODUCTS));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error inesperado');
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
      {!error && <ProductList products={products} />}
    </section>
  );
};
