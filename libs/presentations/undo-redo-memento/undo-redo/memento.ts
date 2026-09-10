import type { TodoItems } from '../types';

export class TodoMemento {
  private readonly state: TodoItems;

  constructor(state: TodoItems) {
    // przy tworzeniu pamiątki tworzymy głęboką kopię stanu, aby zapewnić izolację między obiektami
    this.state = structuredClone(state);
  }

  // zwraca głęboką kopię stanu, aby zapewnić izolację między obiektami
  getState() {
    return structuredClone(this.state);
  }
}
