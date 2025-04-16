export const removeAtIndex =
  <T>(index: number) =>
  (array: T[]) =>
    array.filter((_, i) => i !== index);
