import { Block } from '../../utils/types';
import { calculateFrequencies } from './calculate-frequencies';
import { buildHuffmanTree } from './build-huffman-tree';
import { generateHuffmanCodes } from './generate-huffman-codes';

export function getHuffmanCodes(blocks: Block[]) {
  const dcFrequencies = calculateFrequencies(blocks, true);
  const acFrequencies = calculateFrequencies(blocks, false);

  const huffmanTreeDC = buildHuffmanTree(dcFrequencies);
  const huffmanTreeAC = buildHuffmanTree(acFrequencies);

  const huffmanCodesDC = generateHuffmanCodes(huffmanTreeDC);
  const huffmanCodesAC = generateHuffmanCodes(huffmanTreeAC);

  return { huffmanCodesDC, huffmanCodesAC };
}
