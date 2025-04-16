import { RgbColor } from '../../../types';

export const rgbToString = (color: RgbColor) =>
  `#${color.r.toString(16).padStart(2, '0')}${color.g
    .toString(16)
    .padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
