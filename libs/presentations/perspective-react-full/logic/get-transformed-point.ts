import { InverseTransformationMatrix, Point } from '../types';

// funkcja zwraca współrzędne punktu na obrazie po transformacji
export function getTransformedPoint(
  x: number,
  y: number,
  inverseMatrix: InverseTransformationMatrix,
): Point {
  // pobieramy wartości z macierzy odwrotnej
  const [a, b, c, d, e, f, g, h, i] = inverseMatrix;

  // obliczamy wartości współrzędnych
  const w_ = g * x + h * y + i;
  const x_ = (a * x + b * y + c) / w_;
  const y_ = (d * x + e * y + f) / w_;

  // zwracamy jako tablicę
  return [x_, y_];
}
