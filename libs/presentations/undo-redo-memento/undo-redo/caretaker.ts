import { TodoMemento } from './memento';
import { TodoOriginator } from './originator';
import { setHistory, setTodoItems, type HistoryState } from '../store';

// implementacja caretakera; zarządza sterowaniem aplikacją;
// jest to jedyna klasa, która ma dostęp do obiektu originatora
export class TodoCaretaker {
  // stan historii undo-redo
  private history: HistoryState;

  // przy tworzeniu obiektu tworzymy pustą historię i wywołujemy opublikowanie jej dla interfejsu
  constructor(private readonly originator: TodoOriginator) {
    this.history = {
      past: [],
      current: originator.createMemento(),
      future: [],
    };
    this.publish();
  }

  // dodanie nowej kartki
  addTodo(text: string) {
    // wykonujemy operację poprzez pomocniczą metodę save
    // odpowiada ona za aktualizację historii
    this.save(() => {
      this.originator.addTodo(text);
      return true;
    });
  }

  // edycja istniejącej kartki
  editTodo(id: string, text: string) {
    this.save(() => this.originator.editTodo(id, text));
  }

  // usunięcie istniejącej kartki
  removeTodo(id: string) {
    this.save(() => this.originator.removeTodo(id));
  }

  // przesunięcie kartki
  moveTodo(id: string, direction: -1 | 1) {
    this.save(() => this.originator.moveTodo(id, direction));
  }

  // cofanie
  undo() {
    const [previous, ...past] = this.history.past;
    if (!previous) return;

    this.originator.setMemento(previous);
    this.history = {
      past,
      current: previous,
      future: [this.history.current, ...this.history.future],
    };
    this.publish();
  }

  // ponawianie
  redo() {
    const [next, ...future] = this.history.future;
    if (!next) return;

    this.originator.setMemento(next);
    this.history = {
      past: [this.history.current, ...this.history.past],
      current: next,
      future,
    };
    this.publish();
  }

  reset() {
    this.originator.reset();
    this.history = {
      past: [],
      current: this.originator.createMemento(),
      future: [],
    };
    this.publish();
  }

  // wywołanie podglądu pamiątki
  preview(memento: TodoMemento) {
    return this.originator.previewMemento(memento);
  }

  // pomocnicza metoda do zapisywania zmian w historii
  private save(change: () => boolean) {
    // jeśli nie doszło do żadnej zmiany, to nie zapisujemy
    if (!change()) return;

    this.history = {
      past: [this.history.current, ...this.history.past],
      current: this.originator.createMemento(),
      future: [],
    };
    this.publish();
  }

  // metoda przesyłająca dane do interfejsu
  private publish() {
    setTodoItems(this.originator.getTodoItems());
    setHistory(this.history);
  }
}

// caretaker jest singletonem, istnieje tylko jedna jego instancja
export const caretaker = new TodoCaretaker(new TodoOriginator());
