export type Point = [number, number];

export type TransformationMatrix = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type InverseTransformationMatrix = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type InterpolationFunctionEnum = 'nearest' | 'bilinear';

export type InterpolationFunction = (
  image: ImageData,
  x: number,
  y: number,
) => [number, number, number, number];
