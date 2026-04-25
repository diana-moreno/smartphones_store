import { useCart } from '../../../../entities/cart';
import styles from './RemoveFromCartButton.module.scss';

interface RemoveFromCartButtonProps {
  itemId: string;
}

export const RemoveFromCartButton: React.FC<RemoveFromCartButtonProps> = ({
  itemId,
}) => {
  const { removeItem } = useCart();

  return (
    <button
      type="button"
      aria-label="Remove from cart"
      onClick={() => removeItem(itemId)}
      className={styles.button}
    >
      Remove
    </button>
  );
};
