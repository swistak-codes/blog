export const reverseMapping = (map: Map<string, string>) => {
  const result = new Map<string, string>();

  for (const [first, second] of map) {
    result.set(second, first);
  }

  return result;
};
