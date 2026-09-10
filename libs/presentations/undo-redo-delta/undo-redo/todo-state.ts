import { LexoRank } from 'lexorank';
import { nanoid } from 'nanoid';
import type { TodoItems } from '../types';

// klasa zarządzająca stanem aplikacji; identyczna, jak widzieliśmy wcześniej
export class TodoState {
  private todoItems: TodoItems = {};

  getTodoItems() {
    return structuredClone(this.todoItems);
  }

  setTodoItems(todoItems: TodoItems) {
    this.todoItems = structuredClone(todoItems);
  }

  reset() {
    this.todoItems = {};
  }

  addTodo(text: string) {
    const items = this.sortedItems();
    const id = nanoid();
    const order = items.length
      ? LexoRank.parse(items.at(-1)!.order).genNext().toString()
      : LexoRank.middle().toString();

    this.todoItems = {
      ...this.todoItems,
      [id]: { id, text, order },
    };
  }

  editTodo(id: string, text: string) {
    const item = this.todoItems[id];
    if (!item || item.text === text) return false;

    this.todoItems = { ...this.todoItems, [id]: { ...item, text } };
    return true;
  }

  removeTodo(id: string) {
    if (!this.todoItems[id]) return false;

    const { [id]: removed, ...todoItems } = this.todoItems;
    this.todoItems = todoItems;
    return Boolean(removed);
  }

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

  private sortedItems() {
    return Object.values(this.todoItems).sort((a, b) =>
      a.order.localeCompare(b.order),
    );
  }
}

export const todoState = new TodoState();
