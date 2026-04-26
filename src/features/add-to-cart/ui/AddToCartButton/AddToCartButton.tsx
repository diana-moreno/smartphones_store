import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useCart } from '@/entities/cart';
import type {
  ColorOption,
  ProductDetail,
  StorageOption,
} from '@/entities/product';
import { Button } from '@/shared/ui';

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
  const navigate = useNavigate();

  const { addItem } = useCart();
  const disabled = !selectedColor || !selectedStorage;

  const handleClick = () => {
    if (disabled) return;
    addItem({
      id: uuidv4(),
      productId: product.id,
      name: product.name,
      imageUrl: selectedColor.imageUrl,
      color: { name: selectedColor.name, hexCode: selectedColor.hexCode },
      storage: { capacity: selectedStorage.capacity },
      price: selectedStorage.price,
    });
    navigate('/cart');
  };

  return (
    <Button ariaLabel="Add to cart" onClick={handleClick} disabled={disabled}>
      Add
    </Button>
  );
};
