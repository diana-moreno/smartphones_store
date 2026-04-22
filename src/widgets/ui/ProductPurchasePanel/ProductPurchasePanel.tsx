import { useState } from 'react';
import type { ProductDetail } from '../../../entities/product/model/product';
import { ColorSelector } from '../../../entities/product/ui/ColorSelector/ColorSelector';
import { StorageSelector } from '../../../entities/product/ui/StorageSelector/StorageSelector';
import { AddToCartButton } from '../../../features/addToCart/ui/AddToCartButton/AddToCartButton';
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
      <img
        src={displayImageUrl}
        alt={`${product.brand} ${product.name}`}
        className={styles.image}
      />
      <div>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.price}>
          {isComplete ? `${selectedStorage.price} EUR` : `From ${minPrice} EUR`}
        </p>
        <StorageSelector
          options={product.storageOptions}
          selected={selectedCapacity}
          onChange={setSelectedCapacity}
          label="Storage. How much space do you need?"
        />
        <ColorSelector
          options={product.colorOptions}
          selected={selectedColorName}
          onChange={setSelectedColorName}
          label="Color. Pick your favourite."
        />
        <AddToCartButton
          product={product}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
        />
      </div>
    </section>
  );
};
