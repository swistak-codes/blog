export const modifyAtIndex =
  <T>(element: T, index: number) =>
  (array: T[]) =>
    [...array.slice(0, index), element, ...array.slice(index + 1)];
