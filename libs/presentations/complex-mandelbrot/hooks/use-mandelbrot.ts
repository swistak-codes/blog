import { useEffect, useRef, useState } from 'react';
import { getColorForIteration } from '../utils/colors';
import { Complex } from '../utils/complex';
import { ROWS_PER_BATCH } from '../utils/consts';
import { Viewport } from '../utils/types';

export const useMandelbrot = (
  width: number,
  height: number,
  viewport: Viewport,
  maxIter: number,
) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [computing, setComputing] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    if (width <= 0 || height <= 0) return;
    setComputing(true);
    const arr = new Uint8ClampedArray(width * height * 4);
    const reStart = viewport.x - viewport.scale;
    const reEnd = viewport.x + viewport.scale;
    const imStart = viewport.y - viewport.scale * (height / width);
    const imEnd = viewport.y + viewport.scale * (height / width);

    const rowsPerBatch = ROWS_PER_BATCH;
    let row = 0;

    const processBatch = () => {
      if (ac.signal.aborted) return;
      const maxRow = Math.min(height, row + rowsPerBatch);
      for (let j = row; j < maxRow; j++) {
        if (ac.signal.aborted) return;
        const im = imStart + (j / (height - 1)) * (imEnd - imStart);
        for (let i = 0; i < width; i++) {
          if (ac.signal.aborted) return;
          const re = reStart + (i / (width - 1)) * (reEnd - reStart);
          const c = new Complex(re, im);
          let z = new Complex(0, 0);
          let iter = 0;
          while (z.absSqr() <= 4 && iter < maxIter) {
            if (ac.signal.aborted) return;
            z = z.square().add(c);
            iter++;
          }
          const idx = (j * width + i) * 4;
          const [r, g, b, a] = getColorForIteration(iter, maxIter);
          arr[idx] = r;
          arr[idx + 1] = g;
          arr[idx + 2] = b;
          arr[idx + 3] = a;
        }
      }
      row = maxRow;
      if (ac.signal.aborted) return;
      if (row < height) {
        setTimeout(processBatch, 0);
      } else {
        setImageData(new ImageData(arr, width, height));
        setComputing(false);
        abortRef.current = null;
      }
    };

    setTimeout(processBatch, 0);

    return () => {
      ac.abort();
      setComputing(false);
      abortRef.current = null;
    };
  }, [width, height, viewport.x, viewport.y, viewport.scale, maxIter]);

  return { imageData, computing };
};
