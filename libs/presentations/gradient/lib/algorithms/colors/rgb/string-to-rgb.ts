import { RgbColor } from '../../../types';

export const stringToRgb = (color: string): RgbColor => {
  const splitColor = color.match(/#(..)(..)(..)/);
  return splitColor != null
    ? {
        r: parseInt(splitColor[1], 16),
        g: parseInt(splitColor[2], 16),
        b: parseInt(splitColor[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};
