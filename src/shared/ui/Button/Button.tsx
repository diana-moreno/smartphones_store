import type { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  onClick,
  ariaLabel,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={styles.button}
    >
      {children}
    </button>
  );
};
