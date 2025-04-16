import { HslColor } from '../../../types';
import { lerp } from './lerp';

// funkcja obliczająca interpolację liniową dla koloru
export function lerpHslColor(c0: HslColor, c1: HslColor, t: number): HslColor {
  return {
    h: lerp(c0.h, c1.h, t),
    s: lerp(c0.s, c1.s, t),
    l: lerp(c0.l, c1.l, t),
  };
}
