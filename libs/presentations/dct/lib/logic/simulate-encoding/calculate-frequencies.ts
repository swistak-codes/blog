import { Block } from '../../utils/types';
import { zigzagFlat } from '../zigzag-flat';

export function calculateFrequencies(
  blocks: Block[],
  isDC: boolean
): Map<number, number> {
  const frequencies = new Map<number, number>();
  let previousDC = 0;

  blocks.forEach((block) => {
    const flattened = zigzagFlat(block.quantized);
    const dcValue = flattened[0];
    const dcDiff = dcValue - previousDC;
    previousDC = dcValue;

    if (isDC) {
      frequencies.set(dcDiff, (frequencies.get(dcDiff) || 0) + 1);
    } else {
      let zeroCount = 0;
      for (let i = 1; i < 64; i++) {
        const value = flattened[i];
        if (value === 0) {
          zeroCount++;
        } else {
          while (zeroCount > 15) {
            frequencies.set(0xf0, (frequencies.get(0xf0) || 0) + 1);
            zeroCount -= 16;
          }
          const size = Math.floor(Math.log2(Math.abs(value))) + 1;
          const rleKey = (zeroCount << 4) | size;
          frequencies.set(rleKey, (frequencies.get(rleKey) || 0) + 1);
          zeroCount = 0;
        }
      }
      if (zeroCount > 0) {
        frequencies.set(0x00, (frequencies.get(0x00) || 0) + 1);
      }
    }
  });

  return frequencies;
}
