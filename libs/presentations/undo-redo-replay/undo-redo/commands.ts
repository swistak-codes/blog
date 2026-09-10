import type { TodoReceiver } from './receiver';

export interface Command {
  // wykonanie polecenia
  execute(): boolean;
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
  constructor(
    private readonly receiver: TodoReceiver,
    private readonly id: string,
    private readonly text: string,
  ) {}

  execute() {
    return this.receiver.editTodo(this.id, this.text) !== null;
  }

  getData() {
    return {
      command: this.constructor.name,
      id: this.id,
      text: this.text,
    };
  }
}

// usunięcie notatki
export class RemoveTodoCommand implements Command {
  constructor(
    private readonly receiver: TodoReceiver,
    private readonly id: string,
  ) {}

  execute() {
    return this.receiver.removeTodo(this.id) !== null;
  }

  getData() {
    return {
      command: this.constructor.name,
      id: this.id,
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

  getData() {
    return {
      command: this.constructor.name,
      id: this.id,
      direction: this.direction,
    };
  }
}
