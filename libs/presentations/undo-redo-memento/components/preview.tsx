import { useState } from 'react';
import { caretaker } from '../undo-redo/caretaker';
import type { TodoMemento } from '../undo-redo/memento';
import { useHistoryStore } from '../store';
import styles from '../undo-redo-memento.module.scss';

export const Preview = () => {
  const history = useHistoryStore();
  const [selected, setSelected] = useState<TodoMemento | null>(null);
  const mementos = [...history.past, history.current, ...history.future];
  const visible = selected && mementos.includes(selected) ? selected : null;

  const buttons = (items: readonly TodoMemento[], prefix: string) =>
    items.map((memento, index) => (
      <button
        key={`${prefix}-${index}`}
        type="button"
        aria-pressed={visible === memento}
        onClick={() => setSelected(memento)}
      >
        {prefix}
        {index + 1}
      </button>
    ));

  return (
    <section className={styles.history}>
      <div className={styles.historyLine}>
        <strong>przeszłość = [</strong>
        {buttons(history.past, 'P')}
        <strong>]</strong>
      </div>
      <div className={styles.historyLine}>
        <strong>aktualny = </strong>
        <button
          type="button"
          aria-pressed={visible === history.current}
          onClick={() => setSelected(history.current)}
        >
          A
        </button>
      </div>
      <div className={styles.historyLine}>
        <strong>przyszłość = [</strong>
        {buttons(history.future, 'F')}
        <strong>]</strong>
      </div>
      {visible && (
        <pre className={styles.preview}>
          {JSON.stringify(caretaker.preview(visible), null, 2)}
        </pre>
      )}
    </section>
  );
};
