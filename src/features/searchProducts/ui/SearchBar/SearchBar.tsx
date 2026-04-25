import styles from './SearchBar.module.scss';
import shape from '../../assets/shape.svg';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  totalResults: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  totalResults,
}) => {
  return (
    <>
      <form role="search" className={styles.form}>
        <label htmlFor="product-search" className={styles.label}>
          Search for a smartphone...
        </label>
        <input
          id="product-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a smartphone..."
          className={`${styles.searcher} ${value ? styles.hasValue : ''}`}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className={styles.clear}
          >
            <img src={shape} alt="Clear search icon" />
          </button>
        )}
      </form>
      {(totalResults > 0 || value) && (
        <p className={styles.results}>{totalResults} results</p>
      )}
    </>
  );
};
