// funkcja obliczająca sześcienną krzywą Béziera
export function cubicBezier(p1: number, p2: number, t: number) {
  return 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3;
}
