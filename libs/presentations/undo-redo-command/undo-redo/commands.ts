import type { TodoItem } from '../types';
import type { TodoReceiver } from './receiver';

export interface Command {
  // wykonanie polecenia
  execute(): boolean;
  // cofnięcie polecenia
  undo(): void;
  // dane obiektu polecenia wyświetlane w prezentacji
  getData(): Record<string, unknown>;
}

// polecenie dodania nowej notatki
export class AddTodoCommand implements Command {
  private id?: string;
  private order?: string;

  constructor(
    private readonly receiver: TodoReceiver,
    private readonly text: string,
  ) {}

  execute() {
    // jeśli jest to przywracanie, to nie możemy po prostu dodać nowej notatki
    if (this.id && this.order) {
      return this.receiver.restoreTodo({
        id: this.id,
        text: this.text,
        order: this.order,
      });
    }

    // tworzymy nową notatkę i przechowujemy jej id i order
    const item = this.receiver.addTodo(this.text);
    this.id = item.id;
    this.order = item.order;
    return true;
  }

  undo() {
    // cofnięcie to po prostu usunięcie
    if (this.id) this.receiver.removeTodo(this.id);
  }

  getData() {
    return {
      command: this.constructor.name,
      id: this.id,
      text: this.text,
      order: this.order,
    };
  }
}

// polecenie edycji notatki
export class EditTodoCommand implements Command {
  private previousText?: string;

  constructor(
    private readonly receiver: TodoReceiver,
    private readonly id: string,
    private readonly text: string,
  ) {}

  execute() {
    const previousText = this.receiver.editTodo(this.id, this.text);
    // jeśli nie dostaliśmy poprzedniego tekstu, to nie możemy wykonać polecenia
    if (previousText === null) return false;

    this.previousText ??= previousText;
    return true;
  }

  undo() {
    if (this.previousText !== undefined) {
      this.receiver.editTodo(this.id, this.previousText);
    }
  }

  getData() {
    return {
      command: this.constructor.name,
      id: this.id,
      text: this.text,
      previousText: this.previousText,
    };
  }
}

// usunięcie notatki
export class RemoveTodoCommand implements Command {
  private removed?: TodoItem;

  constructor(
    private readonly receiver: TodoReceiver,
    private readonly id: string,
  ) {}

  execute() {
    const removed = this.receiver.removeTodo(this.id);
    if (!removed) return false;

    this.removed ??= removed;
    return true;
  }

  undo() {
    if (this.removed) this.receiver.restoreTodo(this.removed);
  }

  getData() {
    return {
      command: this.constructor.name,
      id: this.id,
      removed: this.removed,
    };
  }
}

// przesunięcie notatki
export class MoveTodoCommand implements Command {
  constructor(
    private readonly receiver: TodoReceiver,
    private readonly id: string,
    private readonly direction: -1 | 1,
  ) {}

  execute() {
    return this.receiver.moveTodo(this.id, this.direction);
  }

  undo() {
    this.receiver.moveTodo(this.id, this.direction === -1 ? 1 : -1);
  }

  getData() {
    return {
      command: this.constructor.name,
      id: this.id,
      direction: this.direction,
    };
  }
}
