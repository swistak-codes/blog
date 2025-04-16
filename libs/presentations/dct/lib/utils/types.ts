export interface Block {
  originalBlock: number[][];
  normalized: number[][];
  transformed: number[][];
  quantized: number[][];
  unquantized: number[][];
  untransformed: number[][];
  denormalized: number[][];
}

export type HuffmanNode = {
  value?: number;
  frequency: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
};
