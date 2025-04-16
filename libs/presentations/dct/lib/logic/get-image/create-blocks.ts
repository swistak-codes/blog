import { BLOCK_SIZE } from '../../utils/consts';
import { Block } from '../../utils/types';
import { getIndex } from './array-indexing';
import { createBlockData } from '../create-block-data';

interface CreateBlockProps {
  blockColumns: number;
  blockRows: number;
  height: number;
  image: number[];
  quantizationMatrix: number[][];
  width: number;
}

export function createBlocks({
  blockRows,
  blockColumns,
  height,
  image,
  quantizationMatrix,
  width,
}: CreateBlockProps) {
  const pixelsInLastColumn = width % BLOCK_SIZE;
  const pixelsInLastRow = height % BLOCK_SIZE;
  const pixelsToAddInLastColumn = BLOCK_SIZE - pixelsInLastColumn;
  const pixelsToAddInLastRow = BLOCK_SIZE - pixelsInLastRow;
  const blocks: Block[] = [];

  // tworzymy bloki 8x8
  for (let y = 0; y < blockRows; y++) {
    for (let x = 0; x < blockColumns; x++) {
      const block: number[][] = [];
      // dla spostrzegawczych przeglądających kod:
      // prawdopodobnie powinniśmy, w razie potrzeby, dobierać wartości z sąsiadujących bloków
      // jednak dla uproszczenia kodu pominąłem to i powtarzam pierwszą wartość tyle razy ile trzeba
      for (let i = 0; i < BLOCK_SIZE; i++) {
        if (
          y === blockRows - 1 &&
          pixelsInLastRow > 0 &&
          i >= pixelsInLastRow
        ) {
          block.push(
            structuredClone(block[Math.max(0, i - pixelsToAddInLastRow)])
          );
        } else {
          const row: number[] = [];
          for (let j = 0; j < BLOCK_SIZE; j++) {
            let index: number;
            if (
              x === blockColumns - 1 &&
              pixelsInLastColumn > 0 &&
              j >= pixelsInLastColumn
            ) {
              index = getIndex(
                x * BLOCK_SIZE + j - pixelsToAddInLastColumn,
                y * BLOCK_SIZE + i,
                width
              );
            } else {
              index = getIndex(x * BLOCK_SIZE + j, y * BLOCK_SIZE + i, width);
            }
            row.push(image[index]);
          }
          block.push(row);
        }
      }
      // kodujemy blok za pomocą DCT
      blocks.push(createBlockData(block, quantizationMatrix));
    }
  }
  return blocks;
}
