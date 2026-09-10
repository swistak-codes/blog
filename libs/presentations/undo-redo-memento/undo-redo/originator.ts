import { LexoRank } from 'lexorank';
import { nanoid } from 'nanoid';
import { TodoMemento } from './memento';
import type { TodoItems } from '../types';

export class TodoOriginator {
  // aktualny stan aplikacji
  private todoItems: TodoItems = {};

  // tworzenie nowej pamiątki z aktualnego stanu
  createMemento() {
    return new TodoMemento(this.todoItems);
  }

  // ustawienie stanu na podstawie pamiątki
  setMemento(memento: TodoMemento) {
    this.todoItems = memento.getState();
  }

  // podgląd stanu zapisanego w pamiątce
  previewMemento(memento: TodoMemento) {
    return memento.getState();
  }

  // zwraca aktualny stan aplikacji (jako głęboką kopię)
  getTodoItems() {
    return structuredClone(this.todoItems);
  }

  reset() {
    this.todoItems = {};
  }

  // dodanie nowego elementu do listy
  addTodo(text: string) {
    const items = this.sortedItems();
    const id = nanoid();
    // kolejność jest wyznaczana przez algorytm lexorank
    // więcej info: https://swistak.codes/post/kolejnosc-elementow/
    const order = items.length
      ? LexoRank.parse(items.at(-1)!.order).genNext().toString()
      : LexoRank.middle().toString();

    // ustawienie nowego elementu w pamięci
    this.todoItems = {
      ...this.todoItems,
      [id]: { id, text, order },
    };
  }

  // edycja istniejącego elementu listy
  editTodo(id: string, text: string) {
    const item = this.todoItems[id];
    if (!item || item.text === text) return false;

    this.todoItems = { ...this.todoItems, [id]: { ...item, text } };
    return true;
  }

  // usunięcie elementu listy
  removeTodo(id: string) {
    if (!this.todoItems[id]) return false;

    const { [id]: removed, ...todoItems } = this.todoItems;
    this.todoItems = todoItems;
    return Boolean(removed);
  }

  // przesunięcie elementu listy
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

  // zwraca posortowaną listę elementów, aby móc manewrować kolejnością
  private sortedItems() {
    return Object.values(this.todoItems).sort((a, b) =>
      a.order.localeCompare(b.order),
    );
  }
}
