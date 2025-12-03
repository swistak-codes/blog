export const convertArrayToImage = (
  image: number[][],
  width: number,
  height: number,
): string => {
  if (!width || !height) {
    return '';
  }
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    return '';
  }
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  const canvasImg = context.getImageData(0, 0, width, height);
  const pixels = canvasImg.data;
  for (let i = 0, j = 0; i < pixels.length && j < image.length; i += 4, j++) {
    pixels[i] = image[j][0];
    pixels[i + 1] = image[j][1];
    pixels[i + 2] = image[j][2];
    pixels[i + 3] = 255;
  }
  context.putImageData(canvasImg, 0, 0);
  const data = canvas.toDataURL('image/png');
  canvas.remove();

  return data;
};
