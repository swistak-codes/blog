import { DistanceHeuristic, Point } from '../types';

export const manhattan: DistanceHeuristic<Point> = (start, end) =>
  Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
