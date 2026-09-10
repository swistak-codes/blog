import { useState } from 'react';
import { Controls, type EditorState } from './components/controls';
import { Preview } from './components/preview';
import { TodoList } from './components/todo-list';
import { history } from './undo-redo/history';
import styles from './undo-redo-delta.module.scss';

export const UndoRedoDelta = () => {
  const [editor, setEditor] = useState<EditorState | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <TodoList
          onEdit={(item) => setEditor({ id: item.id, text: item.text })}
          onRemove={(id) => {
            history.removeTodo(id);
            if (editor?.id === id) setEditor(null);
          }}
        />
        <Controls editor={editor} setEditor={setEditor} />
      </div>

      <Preview />
    </div>
  );
};

export default UndoRedoDelta;
