import { BLOCK_SIZE } from '../../utils/consts';
import { alpha } from './alpha';

export function idct(unquantized: number[][]) {
  return unquantized.map((row, y) =>
    row.map((_, x) => {
      let transform = 0;
      for (let u = 0; u < BLOCK_SIZE; u++) {
        for (let v = 0; v < BLOCK_SIZE; v++) {
          transform +=
            alpha(u) *
            alpha(v) *
            unquantized[v][u] *
            Math.cos(((2 * x + 1) * u * Math.PI) / (BLOCK_SIZE * 2)) *
            Math.cos(((2 * y + 1) * v * Math.PI) / (BLOCK_SIZE * 2));
        }
      }
      return Math.round((2 / BLOCK_SIZE) * transform);
    })
  );
}
