import { getCurveApproximation } from '../polynomial/get-curve-approximation';
import { getTFromCurve } from '../polynomial/get-t-from-curve';
import { LerpFn, Point2D } from '../../../types';

// funkcja zwracająca kolory stanowiące gradient
export const getPolynomialGradient =
  <T>(lerpColor: LerpFn<T>) =>
  (p1: Point2D, p2: Point2D) =>
  (startColor: T, endColor: T, numColors: number) => {
    const curve = getCurveApproximation(p1, p2, numColors);
    const colors: T[] = [];
    for (let i = 0; i < numColors; i++) {
      const t = i / (numColors - 1);
      const polyT = getTFromCurve(curve, t);
      colors.push(lerpColor(startColor, endColor, polyT));
    }
    return colors;
  };
