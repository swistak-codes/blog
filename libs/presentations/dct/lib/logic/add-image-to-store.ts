import { CANVAS_MAX_SIZE } from '../utils/consts';

export const addImageToStore =
  (
    image: HTMLImageElement,
    setImage: (image: number[], width: number, height: number) => void
  ) =>
  () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const ratio = Math.min(
      CANVAS_MAX_SIZE / image.width,
      CANVAS_MAX_SIZE / image.height
    );
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const width = Math.min(Math.trunc(ratio * image.width), image.width);
    const height = Math.min(Math.trunc(ratio * image.height), image.height);
    canvas.height = height;
    canvas.width = width;
    ctx.drawImage(image, 0, 0, width, height);
    const result: number[] = [];
    const imgData = ctx.getImageData(0, 0, width, height).data;
    for (let i = 0; i < imgData.length; i += 4) {
      const color = Math.trunc(
        (imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3
      );
      result.push(color);
    }
    setImage(result, width, height);
    canvas.remove();
  };
