import type { ReactNode } from 'react';
import styles from './OptionGroup.module.scss';

interface OptionGroupProps {
  label: string;
  children: ReactNode;
}

export const OptionGroup: React.FC<OptionGroupProps> = ({ label, children }) => (
  <fieldset className={styles.fieldset}>
    <legend className={styles.legend}>{label}</legend>
    <ul className={styles.list}>{children}</ul>
  </fieldset>
);
