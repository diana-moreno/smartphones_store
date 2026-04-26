import { useState } from 'react';
import { SearchBar } from '@/features/search-products';

import { ProductGrid } from '../ProductGrid/ProductGrid';
import styles from './ProductList.module.scss';

import { useFetchProducts } from '../../models/useFetchProducts';

export const ProductListPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const { error, isLoading, products } = useFetchProducts(search);

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
      {!isLoading && !error && <ProductGrid products={products} />}
    </section>
  );
};
