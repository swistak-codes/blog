import { HslColor } from '../../../types';
import { deCasteljau } from '../../bezier/de-casteljau';
import { clamp } from '../../other/clamp';

export function hslBezier(t: number, points: HslColor[]): HslColor {
  const tuplePoints = points.map(
    (color) => [color.h, color.s, color.l] as const
  );
  const result = deCasteljau(t, tuplePoints);
  const h = result[0] % 360;

  return {
    h: h >= 0 ? h : 360 + h,
    s: clamp(result[1]),
    l: clamp(result[2]),
  };
}
