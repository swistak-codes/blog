import { IMAGE_MAX_SIZE, IMAGE_MARGIN } from '../utils/consts';
import { State } from '../utils/store';

const getMaxSize = () => {
  const windowWidth = window.innerWidth;
  if (IMAGE_MAX_SIZE + IMAGE_MARGIN * 2 < windowWidth) {
    return IMAGE_MAX_SIZE;
  }
  return windowWidth - IMAGE_MARGIN * 2;
};

export const addImageToStore = (
  image: HTMLImageElement,
  setImage: State['setImage'],
) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  const maxSize = getMaxSize();
  const ratio = Math.min(maxSize / image.width, maxSize / image.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const width = Math.min(Math.trunc(ratio * image.width), image.width);
  const height = Math.min(Math.trunc(ratio * image.height), image.height);
  canvas.height = height;
  canvas.width = width;
  ctx.drawImage(image, 0, 0, width, height);
  const result: number[][] = [];
  const imgData = ctx.getImageData(0, 0, width, height).data;
  for (let i = 0; i < imgData.length; i += 4) {
    const color = [imgData[i], imgData[i + 1], imgData[i + 2]];
    result.push(color);
  }
  setImage(result, width, height);
  canvas.remove();
};
