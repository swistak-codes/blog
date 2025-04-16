import { cubicBezier } from '../../bezier/cubic-bezier';
import { Point2D } from '../../../types';
import { clamp } from '../../other/clamp';

// funkcja zwracająca przybliżony kształt krzywej
export function getCurveApproximation(
  p1: Point2D,
  p2: Point2D,
  numPoints: number
) {
  const points: Point2D[] = [];
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    points.push({
      x: cubicBezier(p1.x, p2.x, t),
      y: clamp(cubicBezier(p1.y, p2.y, t)),
    });
  }
  return points;
}
