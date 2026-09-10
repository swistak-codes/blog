import { FormEvent } from 'react';
import { useHistoryStore } from '../store';
import { history } from '../undo-redo/history';
import styles from '../undo-redo-delta.module.scss';

export interface EditorState {
  id: string | null;
  text: string;
}

interface ControlsProps {
  editor: EditorState | null;
  setEditor: (editor: EditorState | null) => void;
}

export const Controls = ({ editor, setEditor }: ControlsProps) => {
  const state = useHistoryStore();

  const save = (event: FormEvent) => {
    event.preventDefault();
    if (!editor) return;

    const text = editor.text.trim();
    if (!text) return;

    if (editor.id) history.editTodo(editor.id, text);
    else history.addTodo(text);
    setEditor(null);
  };

  return (
    <section className={styles.controls} aria-label="Sterowanie">
      <div className={styles.toolbar}>
        <button
          type="button"
          disabled={!state.past.length}
          onClick={() => history.undo()}
        >
          Cofnij
        </button>
        <button
          type="button"
          onClick={() => {
            history.reset();
            setEditor(null);
          }}
        >
          Resetuj
        </button>
        <button
          type="button"
          disabled={!state.future.length}
          onClick={() => history.redo()}
        >
          Ponów
        </button>
      </div>
      <div className={styles.toolbar}>
        <button type="button" onClick={() => setEditor({ id: null, text: '' })}>
          Dodaj nową
        </button>
      </div>

      {editor && (
        <form className={styles.form} onSubmit={save}>
          <label htmlFor="delta-todo-text">
            {editor.id ? 'Edytuj' : 'Nowa'}
          </label>
          <textarea
            id="delta-todo-text"
            value={editor.text}
            required
            onChange={(event) =>
              setEditor({ ...editor, text: event.target.value })
            }
          />
          <div className={styles.toolbar}>
            <button type="submit">{editor.id ? 'Zapisz' : 'Dodaj'}</button>
            <button type="button" onClick={() => setEditor(null)}>
              Anuluj
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
