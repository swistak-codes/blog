import styles from './undo-redo-mechanism.module.scss';
import { useTwoArrayStore } from './store';

export const Two = () => {
  const { past, current, future } = useTwoArrayStore();

  return (
    <pre className={styles.preview}>
      przeszłość = [{past.join(', ')}]
      <br />
      aktualny = {current}
      <br />
      przyszłość = [{future.join(', ')}]
    </pre>
  );
};
