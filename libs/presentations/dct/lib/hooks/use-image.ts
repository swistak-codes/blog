import { useEffect, useState } from 'react';

export function useImage(image: number[], width: number, height: number) {
  const [dataUrl, setDataUrl] = useState('data:image/png;base64,');

  useEffect(() => {
    if (!width || !height) {
      return;
    }
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    const canvasImg = context.getImageData(0, 0, width, height);
    const pixels = canvasImg.data;
    for (let i = 0, j = 0; i < pixels.length && j < image.length; i += 4, j++) {
      pixels[i] = image[j];
      pixels[i + 1] = image[j];
      pixels[i + 2] = image[j];
      pixels[i + 3] = 255;
    }
    context.putImageData(canvasImg, 0, 0);
    const data = canvas.toDataURL('image/png');
    setDataUrl(data);
    canvas.remove();
  }, [image, width, height, setDataUrl]);

  return { dataUrl };
}
