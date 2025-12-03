import type { Algorithm } from '../utils/types';
import { convertArrayToImage } from './convert-array-to-image';

export const scale: Algorithm = async (image) => {
  // prawdziwe wymiary nie powinny mieć znaczenia więc zróbmy kwadrat
  const width = Math.trunc(Math.sqrt(image.length));
  const height = Math.trunc(image.length / width);
  console.log({ width, height, length: image.length });
  const imgUrl = convertArrayToImage(image, width, height);
  // skalujemy do 1x1
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    return { r: 0, g: 0, b: 0 };
  }
  const img = new Image();
  img.src = imgUrl;
  await new Promise((resolve) => {
    img.onload = () => resolve(true);
  });
  canvas.width = 1;
  canvas.height = 1;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(img, 0, 0, 1, 1);
  const canvasImg = context.getImageData(0, 0, 1, 1);
  const pixels = canvasImg.data;
  const r = pixels[0];
  const g = pixels[1];
  const b = pixels[2];
  canvas.remove();
  img.remove();

  return { r, g, b };
};
