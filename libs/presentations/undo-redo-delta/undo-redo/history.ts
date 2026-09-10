import diff from 'microdiff';
import { setHistory, setTodoItems, type HistoryState } from '../store';
import { applyPatches, reversePatch } from './patches';
import { todoState, type TodoState } from './todo-state';

// klasa zarządzająca historią zmian
// w dużej mierze zachowuje się ona analogicznie do Caretakera z wzorca Memento
export class TodoHistory {
  private history: HistoryState = {
    past: [],
    future: [],
  };

  constructor(private readonly todoState: TodoState) {
    this.publish();
  }

  addTodo(text: string) {
    this.save(() => {
      this.todoState.addTodo(text);
      return true;
    });
  }

  editTodo(id: string, text: string) {
    this.save(() => this.todoState.editTodo(id, text));
  }

  removeTodo(id: string) {
    this.save(() => this.todoState.removeTodo(id));
  }

  moveTodo(id: string, direction: -1 | 1) {
    this.save(() => this.todoState.moveTodo(id, direction));
  }

  undo() {
    const [patches, ...past] = this.history.past;
    if (!patches) return;

    this.todoState.setTodoItems(
      applyPatches(
        this.todoState.getTodoItems(),
        [...patches].reverse().map(reversePatch),
      ),
    );
    this.history = {
      past,
      future: [patches, ...this.history.future],
    };
    this.publish();
  }

  redo() {
    const [patches, ...future] = this.history.future;
    if (!patches) return;

    this.todoState.setTodoItems(
      applyPatches(this.todoState.getTodoItems(), patches),
    );
    this.history = {
      past: [patches, ...this.history.past],
      future,
    };
    this.publish();
  }

  reset() {
    this.todoState.reset();
    this.history = {
      past: [],
      future: [],
    };
    this.publish();
  }

  private save(change: () => boolean) {
    const before = this.todoState.getTodoItems();
    if (!change()) return;

    const patches = diff(before, this.todoState.getTodoItems());
    if (!patches.length) return;

    this.history = {
      past: [patches, ...this.history.past],
      future: [],
    };
    this.publish();
  }

  // metoda przesyłająca dane do interfejsu
  private publish() {
    setTodoItems(this.todoState.getTodoItems());
    setHistory(this.history);
  }
}

export const history = new TodoHistory(todoState);
