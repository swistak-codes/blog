import { DistanceHeuristic, MapPoint, Point } from '../types';

export const constant: DistanceHeuristic<Point | MapPoint> = () => 1;
