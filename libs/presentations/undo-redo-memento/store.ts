import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { TodoMemento } from './undo-redo/memento';
import type { TodoItems } from './types';

interface State {
  todoItems: TodoItems;
}

export interface HistoryState {
  past: TodoMemento[];
  current: TodoMemento;
  future: TodoMemento[];
}

export const useStore = create<State>(() => ({
  todoItems: {},
}));

export const useHistoryStore = create<HistoryState>(() => ({
  past: [],
  current: new TodoMemento({}),
  future: [],
}));

export const setTodoItems = (todoItems: TodoItems) =>
  useStore.setState({ todoItems });

export const setHistory = (history: HistoryState) =>
  useHistoryStore.setState(history);

export const useTodoItems = () =>
  useStore(
    useShallow((state) =>
      Object.values(state.todoItems).sort((a, b) =>
        a.order.localeCompare(b.order),
      ),
    ),
  );
