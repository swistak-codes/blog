import { useContext, useState } from 'react';
import { DiagramContext } from './diagram-context';
import { getNextId } from '../logic/get-next-id';
import { getInitialGraph } from '../logic/get-initial-graph';
import styles from '../styles.module.scss';

export const Actions = () => {
  const { diagram, nodes, edgeHandles } = useContext(DiagramContext);
  const [isEditing, setEditing] = useState(false);

  const handleAddNode = () => {
    if (diagram) {
      diagram.add({
        group: 'nodes',
        data: { id: getNextId(nodes), color: 'white' },
      });
    }
  };

  const handleClear = () => {
    if (diagram) {
      diagram.remove(diagram.nodes());
    }
  };

  const handleReset = () => {
    if (diagram) {
      diagram.remove(diagram.nodes());
      diagram.add(getInitialGraph());
    }
  };

  const handleEdit = () => {
    if (edgeHandles) {
      setEditing(true);
      edgeHandles.enableDrawMode();
    }
  };

  const handleStopEdit = () => {
    if (edgeHandles) {
      setEditing(false);
      edgeHandles.disableDrawMode();
    }
  };

  return (
    <div className={styles.actionsContainer}>
      {isEditing ? (
        <>
          <button onClick={handleAddNode}>Dodaj wierzchołek</button>
          <button onClick={handleClear}>Wyczyść</button>
          <button onClick={handleReset}>Resetuj</button>
          <button onClick={handleStopEdit}>Wyłącz edycję</button>
        </>
      ) : (
        <button onClick={handleEdit}>Edytuj</button>
      )}
    </div>
  );
};
