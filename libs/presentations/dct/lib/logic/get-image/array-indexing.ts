export function getIndex(x: number, y: number, width: number) {
  return y * width + x;
}

export function getXY(i: number, width: number) {
  const x = i % width;
  const y = Math.trunc(i / width);
  return [x, y];
}
