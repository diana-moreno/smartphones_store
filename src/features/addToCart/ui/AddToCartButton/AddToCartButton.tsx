import { useCart } from '../../../../entities/cart/model/useCart';
import type {
  ColorOption,
  ProductDetail,
  StorageOption,
} from '../../../../entities/product/model/product';
import styles from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
  product: ProductDetail;
  selectedColor?: ColorOption;
  selectedStorage?: StorageOption;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedColor,
  selectedStorage,
}) => {
  const { addItem } = useCart();
  const disabled = !selectedColor || !selectedStorage;

  const handleClick = () => {
    if (!selectedColor || !selectedStorage) return;
    addItem({
      id: `${product.id}-${selectedColor.name}-${selectedStorage.capacity}`,
      productId: product.id,
      name: product.name,
      imageUrl: selectedColor.imageUrl,
      color: { name: selectedColor.name, hexCode: selectedColor.hexCode },
      storage: { capacity: selectedStorage.capacity },
      price: selectedStorage.price,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={styles.button}
    >
      Añadir
    </button>
  );
};
