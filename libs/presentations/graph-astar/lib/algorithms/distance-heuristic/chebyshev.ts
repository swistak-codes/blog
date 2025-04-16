import { DistanceHeuristic, Point } from '../types';

export const chebyshev: DistanceHeuristic<Point> = (start, end) =>
  Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y));
