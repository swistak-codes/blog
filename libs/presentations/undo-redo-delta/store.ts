import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { Difference } from 'microdiff';
import type { TodoItems } from './types';

interface State {
  todoItems: TodoItems;
}

export interface HistoryState {
  past: Difference[][];
  future: Difference[][];
}

export const useStore = create<State>(() => ({
  todoItems: {},
}));

export const useHistoryStore = create<HistoryState>(() => ({
  past: [],
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
