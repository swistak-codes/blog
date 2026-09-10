import { useCurrent } from './store';
import styles from './undo-redo-mechanism.module.scss';

export const Display = () => {
  const value = useCurrent();
  const displayValue = value == null ? '-' : value;

  return <div className={styles.display}>{displayValue}</div>;
};
