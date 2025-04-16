import { clamp } from './clamp';

export function denormalizePixels(untransformed: number[][]) {
  return untransformed.map((row) => row.map((px) => clamp(px + 128)));
}
