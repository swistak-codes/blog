export type Point<T> = {
  color: T;
  position: number;
};

export type RgbColor = {
  r: number;
  g: number;
  b: number;
};

export type RgbPoint = Point<RgbColor>;

export type HslColor = {
  h: number;
  s: number;
  l: number;
};

export type HslPoint = Point<HslColor>;

export type Point2D = {
  x: number;
  y: number;
};

export type LerpFn<T> = (start: T, end: T, num: number) => T;

export type Mode = 'rgb' | 'hsl';

export type BezierFn<T> = (t: number, points: T[]) => T;
