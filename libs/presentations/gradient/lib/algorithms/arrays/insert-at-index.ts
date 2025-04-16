export const insertAtIndex =
  <T>(element: T, index: number) =>
  (array: T[]) =>
    [...array.slice(0, index + 1), element, ...array.slice(index + 1)];
