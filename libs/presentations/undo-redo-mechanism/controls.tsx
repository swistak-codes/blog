import styles from './undo-redo-mechanism.module.scss';
import {
  generateValue,
  redo,
  reset,
  undo,
  useCanRedo,
  useCanUndo,
} from './store';

export const Controls = () => {
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <>
      <div className={styles.controls}>
        <button disabled={!canUndo} onClick={undo}>
          Cofnij
        </button>
        <button onClick={generateValue}>Generuj</button>
        <button disabled={!canRedo} onClick={redo}>
          Ponów
        </button>
      </div>
      <div className={styles.controls}>
        <button onClick={reset}>Resetuj</button>
      </div>
    </>
  );
};
