import dynamic from 'next/dynamic';
import styles from '../../posts.module.scss';

const GraphRepresentations = dynamic(
  () => import('@swistak-codes/presentations/graph-representations'),
  {
    ssr: false,
  }
);

export const Presentation = () => {
  return <GraphRepresentations className={styles.borderedDiagram} />;
};
