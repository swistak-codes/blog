import { useState } from 'react';
import { RemoveTodoCommand } from './undo-redo/commands';
import { invoker } from './undo-redo/invoker';
import { receiver } from './undo-redo/receiver';
import { Controls, type EditorState } from './components/controls';
import { Preview } from './components/preview';
import { TodoList } from './components/todo-list';
import styles from './undo-redo-replay.module.scss';

export const UndoRedoReplay = () => {
  const [editor, setEditor] = useState<EditorState | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        <TodoList
          onEdit={(item) => setEditor({ id: item.id, text: item.text })}
          onRemove={(id) => {
            invoker.execute(new RemoveTodoCommand(receiver, id));
            if (editor?.id === id) setEditor(null);
          }}
        />
        <Controls editor={editor} setEditor={setEditor} />
      </div>

      <Preview />
    </div>
  );
};

export default UndoRedoReplay;
