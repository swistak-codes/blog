import { RgbColor } from '../../../types';
import { lerp } from './lerp';

// funkcja obliczająca interpolację liniową dla koloru
export function lerpRgbColor(c0: RgbColor, c1: RgbColor, t: number): RgbColor {
  // zakładamy, że kolory są zapisane 8-bitowo, dlatego zaokrąglimy
  return {
    r: Math.round(lerp(c0.r, c1.r, t)),
    g: Math.round(lerp(c0.g, c1.g, t)),
    b: Math.round(lerp(c0.b, c1.b, t)),
  };
}
