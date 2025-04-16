import { BezierFn } from '../../../types';

export const getBezierGradient =
  <T>(bezier: BezierFn<T>) =>
  (points: T[], numColors: number) => {
    const colors: T[] = [];
    for (let i = 0; i < numColors; i++) {
      const t = i / (numColors - 1);
      colors.push(bezier(t, points));
    }
    return colors;
  };
