import { RgbColor } from '../../../types';
import { deCasteljau } from '../../bezier/de-casteljau';
import { clamp } from '../../other/clamp';

export function rgbBezier(t: number, points: RgbColor[]): RgbColor {
  const tuplePoints = points.map(
    (color) => [color.r, color.g, color.b] as const
  );
  const result = deCasteljau(t, tuplePoints);

  return {
    r: clamp(Math.round(result[0]), 0, 255),
    g: clamp(Math.round(result[1]), 0, 255),
    b: clamp(Math.round(result[2]), 0, 255),
  };
}
