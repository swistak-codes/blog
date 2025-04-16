import { HslColor } from '../../../types';

export const getRandomHsl = (): HslColor => ({
  h: Math.trunc(Math.random() * 360),
  s: Math.random(),
  l: Math.random(),
});
