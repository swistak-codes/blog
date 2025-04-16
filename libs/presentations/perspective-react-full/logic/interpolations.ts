import { InterpolationFunction } from '../types';

// funkcja znajdująca wartość piksela metodą interpolacji dwuliniowej
// zakładamy dla uproszczenia, że image to tablica dwuwymiarowa z wartościami pikseli
export const bilinearInterpolation: InterpolationFunction = (image, x, y) => {
  // pobieramy sąsiadujące punkty
  const x1 = Math.floor(x);
  const y1 = Math.floor(y);
  const x2 = Math.min(x1 + 1, image.width - 1);
  const y2 = Math.min(y1 + 1, image.height - 1);

  // obliczamy współczynniki
  const alpha = x - x1;
  const beta = y - y1;

  // pobieramy wartości pikseli z otoczenia
  const fQ11 = [
    image.data[(y1 * image.width + x1) * 4],
    image.data[(y1 * image.width + x1) * 4 + 1],
    image.data[(y1 * image.width + x1) * 4 + 2],
    image.data[(y1 * image.width + x1) * 4 + 3],
  ];
  const fQ21 = [
    image.data[(y1 * image.width + x2) * 4],
    image.data[(y1 * image.width + x2) * 4 + 1],
    image.data[(y1 * image.width + x2) * 4 + 2],
    image.data[(y1 * image.width + x2) * 4 + 3],
  ];
  const fQ12 = [
    image.data[(y2 * image.width + x1) * 4],
    image.data[(y2 * image.width + x1) * 4 + 1],
    image.data[(y2 * image.width + x1) * 4 + 2],
    image.data[(y2 * image.width + x1) * 4 + 3],
  ];
  const fQ22 = [
    image.data[(y2 * image.width + x2) * 4],
    image.data[(y2 * image.width + x2) * 4 + 1],
    image.data[(y2 * image.width + x2) * 4 + 2],
    image.data[(y2 * image.width + x2) * 4 + 3],
  ];

  // obliczamy wartości pikseli na osi x
  const fXy1 = fQ11.map((val, i) => (1 - alpha) * val + alpha * fQ21[i]);
  const fXy2 = fQ12.map((val, i) => (1 - alpha) * val + alpha * fQ22[i]);

  // obliczamy wartość piksela po interpolacji
  return fXy1.map((val, i) => (1 - beta) * val + beta * fXy2[i]) as [
    number,
    number,
    number,
    number,
  ];
};

export const nearestNeighbor: InterpolationFunction = (image, x, y) => {
  // zaokrąglamy do najbliższych pikseli
  const x1 = Math.round(x);
  const y1 = Math.round(y);

  // zwracamy wartość piksela
  return [
    image.data[(y1 * image.width + x1) * 4],
    image.data[(y1 * image.width + x1) * 4 + 1],
    image.data[(y1 * image.width + x1) * 4 + 2],
    image.data[(y1 * image.width + x1) * 4 + 3],
  ];
};
