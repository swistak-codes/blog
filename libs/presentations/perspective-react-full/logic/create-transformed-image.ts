import { InterpolationFunction, TransformationMatrix } from '../types';
import { getInversePerspectiveTransform } from './get-inverse-perspective-transform';
import { getTransformedPoint } from './get-transformed-point';

async function getSourceImageData(image: string) {
  const img = new Image();
  img.src = image;
  await new Promise((resolve) => {
    img.onload = resolve;
  });
  const canvas = new OffscreenCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return ctx.getImageData(0, 0, img.width, img.height);
}

export async function createTransformedImage(
  image: string,
  transformationMatrix: TransformationMatrix,
  width: number,
  height: number,
  interpolate: InterpolationFunction,
) {
  if (!image) {
    return '';
  }
  const inverseMatrix = getInversePerspectiveTransform(transformationMatrix);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return '';
  }
  const resultImg = ctx.createImageData(width, height);
  const sourceImg = await getSourceImageData(image);
  if (!sourceImg) {
    return '';
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [x_, y_] = getTransformedPoint(x, y, inverseMatrix);
      const color = interpolate(sourceImg, x_, y_);
      const index = (y * width + x) * 4;
      resultImg.data[index] = color[0];
      resultImg.data[index + 1] = color[1];
      resultImg.data[index + 2] = color[2];
      resultImg.data[index + 3] = color[3];
    }
  }
  ctx.putImageData(resultImg, 0, 0);
  return canvas.toDataURL();
}
