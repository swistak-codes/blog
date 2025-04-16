import { DEFAULT_QUANTIZATION_MATRIX } from '../utils/consts';

// na podstawie: https://stackoverflow.com/a/29216609
export function interpolateMatrix(quality: number) {
  quality = Math.max(1, Math.min(100, quality));
  const scale = quality < 50 ? 5000 / quality : 200 - quality * 2;

  return DEFAULT_QUANTIZATION_MATRIX.map((row) =>
    row.map((x) => {
      const q = Math.trunc((x * scale + 50) / 100);
      return Math.max(1, Math.min(255, q));
    })
  );
}
