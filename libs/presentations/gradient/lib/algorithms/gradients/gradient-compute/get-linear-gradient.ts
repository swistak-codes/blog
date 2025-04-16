import { LerpFn } from '../../../types';

// funkcja zwracająca kolory stanowiące gradient
export const getLinearGradient =
  <T>(lerpColor: LerpFn<T>) =>
  (startColor: T, endColor: T, numColors: number) => {
    const colors: T[] = [];
    for (let i = 0; i < numColors; i++) {
      const t = i / (numColors - 1);
      colors.push(lerpColor(startColor, endColor, t));
    }
    return colors;
  };
