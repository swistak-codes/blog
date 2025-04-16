import { zigzagFlat } from './zigzag-flat';
import { getHuffmanCodes } from './simulate-encoding/get-huffman-codes';
import { Block } from '../utils/types';
import { getBitLength } from './simulate-encoding/get-bit-length';

export function simulateEncoding(blocks: Block[]) {
  if (blocks.length === 0) {
    return [];
  }
  const { huffmanCodesDC, huffmanCodesAC } = getHuffmanCodes(blocks);
  let previousDC = 0;

  return blocks.map((block) => {
    let result = 0;
    const flattened = zigzagFlat(block.quantized);

    // kodowanie wartości DC z różnicowaniem
    const dcValue = flattened[0];
    const dcDiff = dcValue - previousDC;
    previousDC = dcValue;
    const dcCode = huffmanCodesDC.get(dcDiff) || '';
    result += dcCode.length;
    result += getBitLength(dcDiff);

    // kodowanie RLE dla wartości AC
    let zeroCount = 0;
    for (let i = 1; i < 64; i++) {
      const value = flattened[i];
      if (value === 0) {
        zeroCount++;
      } else {
        while (zeroCount > 15) {
          // kod ZRL dla 16 zer
          result += huffmanCodesAC.get(0xf0)?.length || 0;
          zeroCount -= 16;
        }
        const size = getBitLength(value);
        const rleKey = (zeroCount << 4) | size;
        const acCode = huffmanCodesAC.get(rleKey) || '';
        result += acCode.length;
        result += size;
        zeroCount = 0;
      }
    }
    // kod EOB, jeśli pozostały niezapisane zera
    if (zeroCount > 0) {
      result += huffmanCodesAC.get(0x00)?.length || 0;
    }
    return Math.ceil(result / 8);
  });
}
