import { useContext, useEffect, useState } from 'react';
import { DiagramContext } from './diagram-context';
import { isValidEdgeList } from '../logic/is-valid-edge-list';
import styles from '../styles.module.scss';

export const EdgeList = () => {
  const [currentList, setCurrentList] = useState<[string, string][]>([]);
  const { edges } = useContext(DiagramContext);

  useEffect(() => {
    if (isValidEdgeList(edges)) {
      setCurrentList(edges);
    }
  }, [edges, setCurrentList]);

  return (
    <div>
      <code>[</code>
      <div className={styles.grid}>
        {currentList.map((x, i) => (
          <code key={i}>{JSON.stringify(x)},</code>
        ))}
      </div>
      <code>]</code>
    </div>
  );
};
