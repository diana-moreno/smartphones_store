import type { ProductSummary } from '../model/product';

interface ProductCardProps {
  product: ProductSummary;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article>
      <img src={product.imageUrl} alt={`${product.brand} ${product.name}`} />
      <h2>
        <span>{product.brand}</span>
        <span>{product.name}</span>
      </h2>
      <p>{product.basePrice} EUR</p>
    </article>
  );
};
