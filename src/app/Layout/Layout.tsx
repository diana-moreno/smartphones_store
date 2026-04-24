import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/ui';
import { LoadingBar } from './LoadingBar';
import styles from './Layout.module.scss';

export const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
        <LoadingBar />
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
