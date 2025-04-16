import { HuffmanNode } from '../../utils/types';

export function buildHuffmanTree(
  frequencies: Map<number, number>
): HuffmanNode {
  const nodes: HuffmanNode[] = [];
  frequencies.forEach((frequency, value) => {
    nodes.push({ value, frequency });
  });

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    const left = nodes.shift();
    const right = nodes.shift();
    if (!left || !right) {
      throw new Error('Za dużo elementów zostało usuniętych z kolejki');
    }
    const newNode: HuffmanNode = {
      frequency: left.frequency + right.frequency,
      left,
      right,
    };
    nodes.push(newNode);
  }

  return nodes[0];
}
