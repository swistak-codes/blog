import { Point, TransformationMatrix } from '../types';

// funkcja rozwiązująca układ równań metodą Gaussa
// A to macierz współczynników, b to wektor wyrazów wolnych
function solveLinearSystem(A: number[][], b: number[]): number[] {
  const n = A.length;
  // tworzymy macierz rozszerzoną [A|b]
  for (let i = 0; i < n; i++) {
    A[i] = A[i].slice(); // kopiujemy wiersz macierzy A
    A[i].push(b[i]); // dodajemy element wektora b do wiersza macierzy A
  }
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    // szukamy wiersza z największym elementem w kolumnie i
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
        maxRow = k;
      }
    }
    // zamiana wierszy
    [A[i], A[maxRow]] = [A[maxRow], A[i]];
    const pivot = A[i][i];
    if (Math.abs(pivot) < Number.EPSILON) {
      throw new Error('Macierz osobliwa - nie można rozwiązać układu');
    }
    // normalizacja wiersza
    for (let j = i; j <= n; j++) {
      A[i][j] /= pivot;
    }
    // eliminacja Gaussa
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const factor = A[k][i];
      for (let j = i; j <= n; j++) {
        A[k][j] -= factor * A[i][j];
      }
    }
  }
  // wyciągamy rozwiązanie z macierzy rozszerzonej
  const x: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    x[i] = A[i][n];
  }
  return x;
}

// funkcja zwraca macierz przekształcenia perspektywicznego
// pointsSrc to tablica z punktami P1, P2, P3, P4; analogiczna jak w implementacji w Pythonie
// W i H to wysokość i szerokość obrazu; zastosowałem to nazewnictwo, aby mieć te same nazwy zmiennych co we wzorze
export function getPerspectiveTransform(
  pointsSrc: [Point, Point, Point, Point],
  W: number,
  H: number,
): TransformationMatrix {
  const [pt0, pt1, pt2, pt3] = pointsSrc;

  // współrzędne punktów źródłowych
  const [x0, y0] = pt0;
  const [x1, y1] = pt1;
  const [x2, y2] = pt2;
  const [x3, y3] = pt3;

  // tworzymy układ równań w postaci macierzy
  const A: number[][] = [
    [x0, y0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, x0, y0, 1, 0, 0],
    [x1, y1, 1, 0, 0, 0, -W * x1, -W * y1],
    [0, 0, 0, x1, y1, 1, 0, 0],
    [x2, y2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, x2, y2, 1, -H * x2, -H * y2],
    [x3, y3, 1, 0, 0, 0, -W * x3, -W * y3],
    [0, 0, 0, x3, y3, 1, -H * x3, -H * y3],
  ];
  // wektor B z docelowymi współrzędnymi, czyli wartościami po znaku równości
  const b: number[] = [0, 0, W, 0, 0, H, W, H];
  // rozwiązujemy układ równań
  const r = solveLinearSystem(A, b);

  // zwracamy wynik
  return r as TransformationMatrix;
}
