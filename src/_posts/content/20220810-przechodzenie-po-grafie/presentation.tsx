import dynamic from 'next/dynamic';
import styles from '../../posts.module.scss';

const GraphRepresentations = dynamic(
  () => import('@swistak-codes/presentations/graph-traversal'),
  {
    ssr: false,
  }
);

type Props = {
  type: 'BFS' | 'DFS';
};

export const Presentation = ({ type }: Props) => {
  return (
    <GraphRepresentations className={styles.borderedDiagram} type={type} />
  );
};
