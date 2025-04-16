import { useContext } from 'react';
import { DiagramContext } from './diagram-context';
import { getNextId } from '../logic/get-next-id';
import styles from '../styles.module.scss';

export const Actions = () => {
  const { diagram, nodes } = useContext(DiagramContext);

  const handleAddNode = () => {
    if (diagram) {
      diagram.add({
        group: 'nodes',
        data: { id: getNextId(nodes) },
      });
    }
  };

  const handleClear = () => {
    if (diagram) {
      diagram.remove(diagram.nodes());
    }
  };

  return (
    <div className={styles.controlsContainer}>
      <button onClick={handleAddNode}>Dodaj wierzchołek</button>
      <button onClick={handleClear}>Wyczyść</button>
    </div>
  );
};
