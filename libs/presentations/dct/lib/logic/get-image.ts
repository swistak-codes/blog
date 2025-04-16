import { BLOCK_SIZE } from '../utils/consts';
import { createBlocks } from './get-image/create-blocks';
import { createImageFromBlocks } from './get-image/create-image-from-blocks';

export function getImage(
  image: number[],
  quantizationMatrix: number[][],
  width: number,
  height: number
) {
  const blockColumns = Math.ceil(width / BLOCK_SIZE);
  const blockRows = Math.ceil(height / BLOCK_SIZE);

  // uzyskujemy dane na temat bloków
  const blocks = createBlocks({
    blockColumns,
    blockRows,
    height,
    image,
    quantizationMatrix,
    width,
  });

  // z zakodowanych danych w blokach tworzymy nowy obraz
  const encodedImage = createImageFromBlocks({
    blocks,
    blockColumns,
    height,
    width,
  });

  return {
    blocks,
    encodedImage,
  };
}
