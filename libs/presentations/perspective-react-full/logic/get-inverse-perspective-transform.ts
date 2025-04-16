import { InverseTransformationMatrix, TransformationMatrix } from '../types';

// funkcja zwraca macierz odwrotną do macierzy transformacji
// macierz transformacji to tablica z wartościami a, b, c, d, e, f, g, h
export function getInversePerspectiveTransform([
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
]: TransformationMatrix): InverseTransformationMatrix {
  // obliczamy wyznacznik; usunąłem z niego mnożenie przez 1
  const detA = a * e + b * f * g + c * d * h - c * e * g - b * d - a * f * h;

  // a teraz obliczamy wartości poszczególnych elementów macierzy
  const a_ = (e - f * h) / detA;
  const b_ = (c * h - b) / detA;
  const c_ = (b * f - c * e) / detA;
  const d_ = (f * g - d) / detA;
  const e_ = (a - c * g) / detA;
  const f_ = (c * d - a * f) / detA;
  const g_ = (d * h - e * g) / detA;
  const h_ = (b * g - a * h) / detA;
  const i_ = (a * e - b * d) / detA;

  // ponownie zwracamy wartości jako tablicę jednowymiarową
  return [a_, b_, c_, d_, e_, f_, g_, h_, i_];
}
