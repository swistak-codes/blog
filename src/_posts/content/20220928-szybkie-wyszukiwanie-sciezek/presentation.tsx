import dynamic from 'next/dynamic';
import styles from '../../posts.module.scss';

const Astar = dynamic(
  () => import('@swistak-codes/presentations/graph-astar'),
  {
    ssr: false,
  }
);

export const Presentation = () => <Astar className={styles.borderedDiagram} />;
