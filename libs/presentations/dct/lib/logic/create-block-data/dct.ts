import { BLOCK_SIZE } from '../../utils/consts';
import { alpha } from './alpha';

export function dct(normalized: number[][]) {
  return normalized.map((row, v) =>
    row.map((_, u) => {
      let transform = 0;
      for (let x = 0; x < BLOCK_SIZE; x++) {
        for (let y = 0; y < BLOCK_SIZE; y++) {
          transform +=
            normalized[y][x] *
            Math.cos(((2 * x + 1) * u * Math.PI) / (BLOCK_SIZE * 2)) *
            Math.cos(((2 * y + 1) * v * Math.PI) / (BLOCK_SIZE * 2));
        }
      }
      return (2 / BLOCK_SIZE) * alpha(u) * alpha(v) * transform;
    })
  );
}
