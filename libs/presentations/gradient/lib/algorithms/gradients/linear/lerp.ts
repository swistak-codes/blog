// funkcja obliczająca interpolację liniową
export function lerp(p0: number, p1: number, t: number) {
  return (1 - t) * p0 + t * p1;
}
