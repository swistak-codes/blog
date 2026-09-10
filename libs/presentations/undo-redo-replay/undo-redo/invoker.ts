import { setHistory, setTodoItems, type HistoryState } from '../store';
import type { Command } from './commands';
import { receiver, type TodoReceiver } from './receiver';

// invoker zarządza historią poleceń i ich wywołaniem
export class TodoInvoker {
  // aktualny stan historii
  private history: HistoryState = {
    past: [],
    future: [],
  };

  constructor(private readonly receiver: TodoReceiver) {
    this.publish();
  }

  // metoda wywołująca polecenie
  execute(command: Command) {
    if (!command.execute()) return;

    this.history = {
      past: [command, ...this.history.past],
      future: [],
    };
    this.publish();
  }

  // cofanie
  undo() {
    const [command, ...past] = this.history.past;
    if (!command) return;

    this.history = {
      past,
      future: [command, ...this.history.future],
    };
    this.replay();
  }

  // ponawianie
  redo() {
    const [command, ...future] = this.history.future;
    if (!command) return;

    this.history = {
      past: [command, ...this.history.past],
      future,
    };
    this.replay();
  }

  reset() {
    this.receiver.reset();
    this.history = {
      past: [],
      future: [],
    };
    this.publish();
  }

  // odtworzenie stanu przez ponowne wykonanie wszystkich aktywnych poleceń
  private replay() {
    this.receiver.reset();
    [...this.history.past].reverse().forEach((command) => command.execute());
    this.publish();
  }

  // metoda przesyłająca dane do interfejsu
  private publish() {
    setTodoItems(this.receiver.getTodoItems());
    setHistory(this.history);
  }
}

// invoker jest singletonem, tylko jedna instancja powinna istnieć w systemie
export const invoker = new TodoInvoker(receiver);
