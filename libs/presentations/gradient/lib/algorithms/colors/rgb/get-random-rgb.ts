import { RgbColor } from '../../../types';

export const getRandomRgb = (): RgbColor => ({
  r: Math.trunc(Math.random() * 255),
  g: Math.trunc(Math.random() * 255),
  b: Math.trunc(Math.random() * 255),
});
