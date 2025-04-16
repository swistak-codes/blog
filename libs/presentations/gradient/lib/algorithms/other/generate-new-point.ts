import { Point } from '../../types';

export const generateNewPoint = <T>(
  array: Point<T>[],
  color: T,
  index: number
): Point<T> => {
  const prev = array[index];
  const next = array[index + 1];

  return {
    color,
    position: (prev.position + next.position) / 2,
  };
};
