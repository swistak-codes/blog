import { useState } from 'react';
import type { Command } from '../undo-redo/commands';
import { useHistoryStore } from '../store';
import styles from '../undo-redo-command.module.scss';

export const Preview = () => {
  const history = useHistoryStore();
  const [selected, setSelected] = useState<Command | null>(null);
  const commands = [...history.past, ...history.future];
  const visible = selected && commands.includes(selected) ? selected : null;

  const buttons = (items: readonly Command[]) =>
    items.map((command, index) => (
      <button
        key={index}
        type="button"
        aria-pressed={visible === command}
        onClick={() => setSelected(command)}
      >
        {command.constructor.name}
      </button>
    ));

  return (
    <section className={styles.history}>
      <div className={styles.historyLine}>
        <strong>przeszłość = [</strong>
        {buttons(history.past)}
        <strong>]</strong>
      </div>
      <div className={styles.historyLine}>
        <strong>przyszłość = [</strong>
        {buttons(history.future)}
        <strong>]</strong>
      </div>
      {visible && (
        <pre className={styles.preview}>
          {JSON.stringify(visible.getData(), null, 2)}
        </pre>
      )}
    </section>
  );
};
