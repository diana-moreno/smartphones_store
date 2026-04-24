import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../entities/cart/model/useCart';
import type {
  ColorOption,
  ProductDetail,
  StorageOption,
} from '../../../../entities/product/model/product';
import { Button } from '../../../../shared/ui/Button/Button';

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
    navigate('/cart');
  };

  return (
    <Button onClick={handleClick} disabled={disabled}>
      Añadir
    </Button>
  );
};
