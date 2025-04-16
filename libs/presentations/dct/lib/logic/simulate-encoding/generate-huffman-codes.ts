import { HuffmanNode } from '../../utils/types';

export function generateHuffmanCodes(
  node: HuffmanNode,
  prefix = '',
  codes: Map<number, string> = new Map()
): Map<number, string> {
  if (node.value !== undefined) {
    codes.set(node.value, prefix);
  } else {
    if (node.left) {
      generateHuffmanCodes(node.left, prefix + '0', codes);
    }
    if (node.right) {
      generateHuffmanCodes(node.right, prefix + '1', codes);
    }
  }
  return codes;
}
