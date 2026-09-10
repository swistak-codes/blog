import styles from './undo-redo-mechanism.module.scss';
import { Display } from './display';
import { Controls } from './controls';
import { Preview } from './preview';

export const UndoRedoMechanism = () => {
  return (
    <div className={styles.container}>
      <Display />
      <Controls />
      <Preview />
    </div>
  );
};

export default UndoRedoMechanism;
