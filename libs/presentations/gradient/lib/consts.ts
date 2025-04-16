import { HslColor, HslPoint, Point2D, RgbColor, RgbPoint } from './types';

export const initialRgbColors: RgbColor[] = [
  { r: 255, g: 0, b: 0 },
  { r: 0, g: 0, b: 255 },
  { r: 0, g: 255, b: 0 },
];

export const initialHslColors: HslColor[] = [
  { h: 0, s: 1, l: 0.5 },
  { h: 240, s: 1, l: 0.5 },
  { h: 120, s: 1, l: 0.5 },
];

export const initialRgbPoints: RgbPoint[] = [
  {
    position: 0,
    color: initialRgbColors[0],
  },
  {
    position: 1,
    color: initialRgbColors[initialRgbColors.length - 1],
  },
];

export const initialHslPoints: HslPoint[] = [
  {
    position: 0,
    color: initialHslColors[0],
  },
  {
    position: 1,
    color: initialHslColors[initialHslColors.length - 1],
  },
];

export const initialP1: Point2D = {
  x: 0.33,
  y: 1,
};

export const initialP2: Point2D = {
  x: 0.68,
  y: 1,
};

export const CANVAS_HEIGHT = 100;
