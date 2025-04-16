import { HslColor } from '../../../types';
import { stringToRgb } from '../rgb/string-to-rgb';

// kod zapożyczony z https://css-tricks.com/converting-color-spaces-in-javascript/
export const stringToHsl = (color: string): HslColor => {
  let { r, g, b } = stringToRgb(color);
  r /= 255;
  g /= 255;
  b /= 255;

  const cMin = Math.min(r, g, b);
  const cMax = Math.max(r, g, b);
  const delta = cMax - cMin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) {
    h = 0;
  } else if (cMax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cMax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cMax + cMin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return {
    h,
    s,
    l,
  };
};
