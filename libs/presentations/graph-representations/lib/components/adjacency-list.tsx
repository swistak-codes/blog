import { useContext, useEffect, useState } from 'react';
import { DiagramContext } from './diagram-context';
import { isValidEdgeList } from '../logic/is-valid-edge-list';
import { Adjacency, getAdjacencyList } from '../logic/get-adjacency-list';
import styles from '../styles.module.scss';

export const AdjacencyList = () => {
  const [currentList, setCurrentList] = useState<Adjacency[]>([]);
  const { nodes, edges } = useContext(DiagramContext);

  useEffect(() => {
    if (isValidEdgeList(edges)) {
      setCurrentList(getAdjacencyList(nodes, edges));
    }
  }, [nodes, edges, setCurrentList]);

  return (
    <div>
      <code>[</code>
      {currentList.map((adjacency) => (
        <div key={adjacency.id} className={styles.adjacencyContainer}>
          <code>
            {adjacency.id}: {JSON.stringify(adjacency.neighbors)}
          </code>
        </div>
      ))}
      <code>]</code>
    </div>
  );
};
