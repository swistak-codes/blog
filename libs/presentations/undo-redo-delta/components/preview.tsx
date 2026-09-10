import { useState } from 'react';
import type { Difference } from 'microdiff';
import { useHistoryStore } from '../store';
import styles from '../undo-redo-delta.module.scss';

export const Preview = () => {
  const history = useHistoryStore();
  const [selected, setSelected] = useState<Difference | null>(null);
  const patches = [...history.past, ...history.future].flat();
  const visible = selected && patches.includes(selected) ? selected : null;

  const buttons = (changes: readonly Difference[][]) =>
    changes.flatMap((patches, changeIndex) =>
      patches.map((patch, patchIndex) => (
        <button
          key={`${changeIndex}-${patchIndex}`}
          type="button"
          aria-pressed={visible === patch}
          onClick={() => setSelected(patch)}
        >
          {patch.type}
        </button>
      )),
    );

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
        <pre className={styles.preview}>{JSON.stringify(visible, null, 2)}</pre>
      )}
    </section>
  );
};
