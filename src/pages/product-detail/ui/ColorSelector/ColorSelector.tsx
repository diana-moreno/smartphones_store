import type { ColorOption } from '../../../../entities/product';
import { OptionGroup } from '../../../../shared/ui';
import styles from './ColorSelector.module.scss';

interface ColorSelectorProps {
  options: ColorOption[];
  selected: string | null;
  onChange: (name: string) => void;
  label: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  options,
  selected,
  onChange,
  label,
}) => (
  <div>
    <OptionGroup label={label}>
      {options.map((option) => {
        const isSelected = option.name === selected;
        return (
          <li key={option.name}>
            <button
              type="button"
              aria-label={option.name}
              aria-pressed={isSelected}
              onClick={() => onChange(option.name)}
              className={`${styles.button} ${isSelected ? styles.selected : ''}`}
              style={{ backgroundColor: option.hexCode }}
            />
          </li>
        );
      })}
    </OptionGroup>
    <p className={styles.selectedName}>{selected}</p>
  </div>
);
