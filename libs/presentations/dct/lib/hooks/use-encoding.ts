import { useStore } from './use-store';
import { useEffect } from 'react';
import { getImage } from '../logic/get-image';
import { simulateEncoding } from '../logic/simulate-encoding';

export function useEncoding() {
  const {
    originalImage,
    quantizationMatrix,
    width,
    height,
    setEncodedImage,
    setBlocks,
    setEstimatedBlockSizes,
  } = useStore();

  /**
   * "kompresja" obrazka, jeśli został zuploadowany nowy lub została zmieniona macierz kwantyzacji
   */
  useEffect(() => {
    const { blocks, encodedImage } = getImage(
      originalImage,
      quantizationMatrix,
      width,
      height
    );

    const blockSizes = simulateEncoding(blocks);

    setEncodedImage(encodedImage);
    setBlocks(blocks);
    setEstimatedBlockSizes(blockSizes);
  }, [
    originalImage,
    quantizationMatrix,
    width,
    height,
    setEncodedImage,
    setBlocks,
    setEstimatedBlockSizes,
  ]);
}
