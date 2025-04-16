const inv2Root = 1 / Math.sqrt(2);

export function alpha(x: number) {
  return x === 0 ? inv2Root : 1;
}
