import styles from './undo-redo-mechanism.module.scss';
import { useOneArrayStore } from './store';

export const One = () => {
  const { pointer, history } = useOneArrayStore();

  return (
    <pre className={styles.preview}>
      wskaźnik = {pointer}
      <br />
      historia = [{history.join(', ')}]
    </pre>
  );
};
