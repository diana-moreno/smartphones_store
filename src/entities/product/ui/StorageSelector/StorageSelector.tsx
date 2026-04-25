import type { StorageOption } from '../../model/product';
import { OptionGroup } from '../../../../shared/ui';
import styles from './StorageSelector.module.scss';

interface StorageSelectorProps {
  options: StorageOption[];
  selected: string | null;
  onChange: (capacity: string) => void;
  label: string;
}

export const StorageSelector: React.FC<StorageSelectorProps> = ({
  options,
  selected,
  onChange,
  label,
}) => (
  <OptionGroup label={label}>
    {options.map((option) => {
      const isSelected = option.capacity === selected;
      return (
        <li key={option.capacity}>
          <button
            type="button"
            aria-label={option.capacity}
            aria-pressed={isSelected}
            onClick={() => onChange(option.capacity)}
            className={`${styles.button} ${isSelected ? styles.selected : ''}`}
          >
            {option.capacity}
          </button>
        </li>
      );
    })}
  </OptionGroup>
);
