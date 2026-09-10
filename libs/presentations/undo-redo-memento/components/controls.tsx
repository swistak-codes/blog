import { FormEvent } from 'react';
import { caretaker } from '../undo-redo/caretaker';
import { useHistoryStore } from '../store';
import styles from '../undo-redo-memento.module.scss';

export interface EditorState {
  id: string | null;
  text: string;
}

interface ControlsProps {
  editor: EditorState | null;
  setEditor: (editor: EditorState | null) => void;
}

export const Controls = ({ editor, setEditor }: ControlsProps) => {
  const history = useHistoryStore();

  const save = (event: FormEvent) => {
    event.preventDefault();
    if (!editor) return;

    const text = editor.text.trim();
    if (!text) return;

    if (editor.id) caretaker.editTodo(editor.id, text);
    else caretaker.addTodo(text);
    setEditor(null);
  };

  return (
    <section className={styles.controls} aria-label="Sterowanie">
      <div className={styles.toolbar}>
        <button
          type="button"
          disabled={!history.past.length}
          onClick={() => caretaker.undo()}
        >
          Cofnij
        </button>
        <button
          type="button"
          onClick={() => {
            caretaker.reset();
            setEditor(null);
          }}
        >
          Resetuj
        </button>
        <button
          type="button"
          disabled={!history.future.length}
          onClick={() => caretaker.redo()}
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
          <label htmlFor="todo-text">{editor.id ? 'Edytuj' : 'Nowa'}</label>
          <textarea
            id="todo-text"
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
