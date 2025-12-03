import type { Algorithm } from '../utils/types';

export const arithmeticMean: Algorithm = async (image) => {
  let rMean = image[0][0];
  let gMean = image[0][1];
  let bMean = image[0][2];

  for (let i = 1; i < image.length; i++) {
    rMean += (image[i][0] - rMean) / (i + 1);
    gMean += (image[i][1] - gMean) / (i + 1);
    bMean += (image[i][2] - bMean) / (i + 1);
  }

  return {
    r: Math.round(rMean),
    g: Math.round(gMean),
    b: Math.round(bMean),
  };
};

export const quadraticMean: Algorithm = async (image) => {
  let rMean = image[0][0] ** 2;
  let gMean = image[0][1] ** 2;
  let bMean = image[0][2] ** 2;

  for (let i = 1; i < image.length; i++) {
    rMean += (image[i][0] ** 2 - rMean) / (i + 1);
    gMean += (image[i][1] ** 2 - gMean) / (i + 1);
    bMean += (image[i][2] ** 2 - bMean) / (i + 1);
  }

  return {
    r: Math.round(Math.sqrt(rMean)),
    g: Math.round(Math.sqrt(gMean)),
    b: Math.round(Math.sqrt(bMean)),
  };
};
