import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <form role="search" className={styles.form}>
      <label htmlFor="product-search" className={styles.label}>
        Buscar productos
      </label>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a smartphone..."
        className={styles.input}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          className={styles.clear}
        >
          X
        </button>
      )}
    </form>
  );
};
