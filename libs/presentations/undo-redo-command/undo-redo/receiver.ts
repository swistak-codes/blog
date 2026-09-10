import { LexoRank } from 'lexorank';
import { nanoid } from 'nanoid';
import type { TodoItem, TodoItems } from '../types';

// receiver, który odpowiada za logikę aplikacji
export class TodoReceiver {
  // aktualny stan aplikacji
  private todoItems: TodoItems = {};

  // zwraca stan aplikacji jako głęboką kopię
  getTodoItems() {
    return structuredClone(this.todoItems);
  }

  reset() {
    this.todoItems = {};
  }

  // dodanie nowej notatki
  addTodo(text: string) {
    const items = this.sortedItems();
    const id = nanoid();
    const order = items.length
      ? LexoRank.parse(items.at(-1)!.order).genNext().toString()
      : LexoRank.middle().toString();
    const item = { id, text, order };

    this.todoItems = { ...this.todoItems, [id]: item };
    return item;
  }

  // przywrócenie notatki (dodanie, ale bez określania nowego id i kolejności)
  restoreTodo(item: TodoItem) {
    if (this.todoItems[item.id]) return false;

    this.todoItems = {
      ...this.todoItems,
      [item.id]: { ...item },
    };
    return true;
  }

  // edycja notatki
  editTodo(id: string, text: string) {
    const item = this.todoItems[id];
    if (!item || item.text === text) return null;

    this.todoItems = { ...this.todoItems, [id]: { ...item, text } };
    return item.text;
  }

  // usunięcie notatki
  removeTodo(id: string) {
    const item = this.todoItems[id];
    if (!item) return null;

    const { [id]: removed, ...todoItems } = this.todoItems;
    this.todoItems = todoItems;
    return removed;
  }

  // przeniesienie notatki
  moveTodo(id: string, direction: -1 | 1) {
    const items = this.sortedItems();
    const index = items.findIndex((item) => item.id === id);
    const other = items[index + direction];
    if (index < 0 || !other) return false;

    const outer = items[index + direction * 2];
    const otherRank = LexoRank.parse(other.order);
    const order = outer
      ? direction === -1
        ? LexoRank.parse(outer.order).between(otherRank).toString()
        : otherRank.between(LexoRank.parse(outer.order)).toString()
      : direction === -1
        ? otherRank.genPrev().toString()
        : otherRank.genNext().toString();

    this.todoItems = {
      ...this.todoItems,
      [id]: { ...this.todoItems[id], order },
    };
    return true;
  }

  // metoda pomocnicza zwracająca posortowane notatki
  private sortedItems() {
    return Object.values(this.todoItems).sort((a, b) =>
      a.order.localeCompare(b.order),
    );
  }
}

// podobnie jak z invokerem, receiver jest singletonem
export const receiver = new TodoReceiver();
