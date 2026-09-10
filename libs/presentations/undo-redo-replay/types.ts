export interface TodoItem {
  // identyfikator kartki
  id: string;
  // zawartość tekstowa
  text: string;
  // kolejność na liście
  order: string;
}

// nie jest to idealny kształt, ale pozwoli nam lepiej widzieć wykonywane operacje
// bardziej naturalnym rozwiązaniem byłaby tutaj tablica
export type TodoItems = Record<string, TodoItem>;
