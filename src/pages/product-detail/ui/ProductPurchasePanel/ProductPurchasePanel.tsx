import { useState } from 'react';
import type { ProductDetail } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';
import { ColorSelector } from '../ColorSelector/ColorSelector';
import { StorageSelector } from '../StorageSelector/StorageSelector';
import styles from './ProductPurchasePanel.module.scss';

interface ProductPurchasePanelProps {
  product: ProductDetail;
}

export const ProductPurchasePanel: React.FC<ProductPurchasePanelProps> = ({
  product,
}) => {
  const [selectedColorName, setSelectedColorName] = useState<string | null>(
    null
  );
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  const selectedColor = product.colorOptions.find(
    (c) => c.name === selectedColorName
  );
  const selectedStorage = product.storageOptions.find(
    (s) => s.capacity === selectedCapacity
  );

  const minPrice = Math.min(...product.storageOptions.map((s) => s.price));

  const displayImageUrl =
    selectedColor?.imageUrl || product.colorOptions[0].imageUrl;
  const isComplete = selectedColor && selectedStorage;

  return (
    <section className={styles.panel}>
      <div className={styles.imageWrapper}>
        <img
          src={displayImageUrl}
          alt={`${product.brand} ${product.name}`}
          className={styles.image}
        />
      </div>
      <div className={styles.textWrapper}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.price} data-testid="product-price">
          {isComplete ? `${selectedStorage.price} EUR` : `From ${minPrice} EUR`}
        </p>
        <div className={styles.storageWrapper}>
          <StorageSelector
            options={product.storageOptions}
            selected={selectedCapacity}
            onChange={setSelectedCapacity}
            label="Storage. How much space do you need?"
          />
        </div>
        <div className={styles.colorWrapper}>
          <ColorSelector
            options={product.colorOptions}
            selected={selectedColorName}
            onChange={setSelectedColorName}
            label="Color. Pick your favourite."
          />
        </div>
        <div className={styles.addButton}>
          <AddToCartButton
            product={product}
            selectedColor={selectedColor}
            selectedStorage={selectedStorage}
          />
        </div>
      </div>
    </section>
  );
};
