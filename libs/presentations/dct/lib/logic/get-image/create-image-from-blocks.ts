import { getIndex, getXY } from './array-indexing';
import { BLOCK_SIZE } from '../../utils/consts';
import { Block } from '../../utils/types';

interface CreateImageFromBlocksProps {
  blocks: Block[];
  blockColumns: number;
  height: number;
  width: number;
}

export function createImageFromBlocks({
  blocks,
  blockColumns,
  height,
  width,
}: CreateImageFromBlocksProps) {
  // tworzymy pusty, nowy obraz
  const encodedImage: number[] = new Array(height * width).fill(0);

  // odczytujemy zakodowane bloki, aby uzyskać obraz
  for (let i = 0; i < blocks.length; i++) {
    const [blockX, blockY] = getXY(i, blockColumns);
    for (let y = 0; y < BLOCK_SIZE; y++) {
      const originalY = blockY * BLOCK_SIZE + y;
      if (originalY >= height) {
        break;
      }
      for (let x = 0; x < BLOCK_SIZE; x++) {
        const originalX = blockX * BLOCK_SIZE + x;
        if (originalX >= width) {
          break;
        }
        const index = getIndex(originalX, originalY, width);
        encodedImage[index] = blocks[i].denormalized[y][x];
      }
    }
  }
  return encodedImage;
}
