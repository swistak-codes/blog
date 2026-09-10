import { MoveTodoCommand } from '../undo-redo/commands';
import { invoker } from '../undo-redo/invoker';
import { receiver } from '../undo-redo/receiver';
import { useTodoItems } from '../store';
import type { TodoItem } from '../types';
import styles from '../undo-redo-command.module.scss';

interface TodoListProps {
  onEdit: (item: TodoItem) => void;
  onRemove: (id: string) => void;
}

export const TodoList = ({ onEdit, onRemove }: TodoListProps) => {
  const items = useTodoItems();

  const move = (id: string, direction: -1 | 1) =>
    invoker.execute(new MoveTodoCommand(receiver, id, direction));

  return (
    <section className={styles.todos} aria-label="Lista zadań">
      <ul className={styles.list}>
        {items.length ? (
          items.map((item, index) => (
            <li className={styles.item} key={item.id}>
              <button
                className={styles.move}
                type="button"
                aria-label={`Przesuń „${item.text}” w górę`}
                disabled={index === 0}
                onClick={() => move(item.id, -1)}
              >
                ↑
              </button>
              <div className={styles.card}>
                <span>{item.text}</span>
                <div className={styles.itemActions}>
                  <button type="button" onClick={() => onEdit(item)}>
                    Edytuj
                  </button>
                  <button type="button" onClick={() => onRemove(item.id)}>
                    Usuń
                  </button>
                </div>
              </div>
              <button
                className={styles.move}
                type="button"
                aria-label={`Przesuń „${item.text}” w dół`}
                disabled={index === items.length - 1}
                onClick={() => move(item.id, 1)}
              >
                ↓
              </button>
            </li>
          ))
        ) : (
          <li className={styles.empty}>Brak kartek.</li>
        )}
      </ul>
    </section>
  );
};
