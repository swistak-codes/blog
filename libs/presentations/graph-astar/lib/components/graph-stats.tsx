import { Graph } from '../algorithms/graph/graph';
import { useMemo } from 'react';
import styles from '../styles.module.scss';

type Props = {
  graph: Graph<unknown>;
};

export const GraphStats = ({ graph }: Props) => {
  const nodeCount = useMemo(() => graph.nodeCount, [graph]);
  const edgeCount = useMemo(() => graph.getAllEdges().length, [graph]);

  return (
    <div className={styles.controlsContainer}>
      <div>Liczba wierzchołków: {nodeCount},</div>
      <div>liczba krawędzi: {edgeCount}</div>
    </div>
  );
};
