export function getBitLength(value: number): number {
  return value === 0 ? 0 : Math.floor(Math.log2(Math.abs(value))) + 1;
}
