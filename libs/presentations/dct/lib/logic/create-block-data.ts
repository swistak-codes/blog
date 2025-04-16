import { Block } from '../utils/types';
import { normalizePixels } from './create-block-data/normalize-pixels';
import { dct } from './create-block-data/dct';
import { quantize } from './create-block-data/quantize';
import { unquantize } from './create-block-data/unquantize';
import { idct } from './create-block-data/idct';
import { denormalizePixels } from './create-block-data/denormalize-pixels';

export function createBlockData(
  originalBlock: number[][],
  quantizationMatrix: number[][]
): Block {
  // normalizujemy piksele do wartości -128 - 127
  const normalized = normalizePixels(originalBlock);
  // obliczamy transformatę dct
  const transformed = dct(normalized);
  // kwantyzujemy wartości
  const quantized = quantize(transformed, quantizationMatrix);
  // przywracamy transformatę ze skwantyzowanych wartości
  const unquantized = unquantize(quantized, quantizationMatrix);
  // wykonujemy odwrotną transformację dla odzyskania kolorów pikseli
  const untransformed = idct(unquantized);
  // przywracamy wartości pikseli 0 - 255
  const denormalized = denormalizePixels(untransformed);

  return {
    originalBlock,
    normalized,
    transformed,
    quantized,
    unquantized,
    untransformed,
    denormalized,
  };
}
