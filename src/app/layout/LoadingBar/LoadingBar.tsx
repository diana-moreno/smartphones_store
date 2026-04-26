import { useLoading } from '../../model/useLoading';
import styles from './LoadingBar.module.scss';

export const LoadingBar: React.FC = () => {
  const { isLoading } = useLoading();
  if (!isLoading) return null;

  return <div role="progressbar" aria-busy="true" className={styles.bar} />;
};
