import { CellProps } from './types';
import { Point } from '../algorithms/types';

export const calculateHighlightValue = ({
  distance,
  maxDistance,
  realDistance,
}: NonNullable<CellProps<Point>['$additionalInfo']>) => {
  if (distance === Number.POSITIVE_INFINITY) {
    return 100;
  }
  return distance <= realDistance
    ? 100 - (distance / realDistance) * 50
    : 50 - (distance / Math.max(maxDistance, realDistance * 2)) * 50;
};
