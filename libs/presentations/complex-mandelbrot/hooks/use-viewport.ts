import { useCallback, useRef, useState } from 'react';
import { Viewport } from '../utils/types';

export const useViewport = (initial: Viewport) => {
  const [viewport, setViewport] = useState<Viewport>(initial);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const reset = useCallback(() => setViewport(initial), [initial]);

  const setCenter = useCallback(
    (x: number, y: number) => setViewport((v) => ({ ...v, x, y })),
    [],
  );

  return { canvasRef, viewport, setViewport, reset, setCenter };
};
