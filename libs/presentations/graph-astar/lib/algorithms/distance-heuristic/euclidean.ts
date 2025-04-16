import { DistanceHeuristic, Point } from '../types';

export const euclidean: DistanceHeuristic<Point> = (start, end) =>
  Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
