import styles from './complex-mandelbrot.module.scss';
import { useState, useCallback } from 'react';
import {
  INITIAL_VIEWPORT,
  DEFAULT_MAX_ITER,
  DEBOUNCE_ITERATIONS,
  DEBOUNCE_VIEWPORT,
  MOVE_SCALE_FACTOR,
  ZOOM_IN_FACTOR,
  ZOOM_OUT_FACTOR,
} from './utils/consts';
import { useDebouncedValue } from './hooks/use-debounced-value';
import { useViewport } from './hooks/use-viewport';
import { useMandelbrot } from './hooks/use-mandelbrot';
import { MandelbrotCanvas } from './components/mandelbrot-canvas';
import { Controls } from './components/mandelbrot-controls';
import { Meta } from './components/mandelbrot-meta';

export const ComplexMandelbrot = () => {
  const { canvasRef, viewport, setViewport, reset } =
    useViewport(INITIAL_VIEWPORT);
  const [maxIter, setMaxIter] = useState(DEFAULT_MAX_ITER);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 480 });

  const [debouncedMaxIter] = useDebouncedValue(maxIter, DEBOUNCE_ITERATIONS);
  const [debouncedViewport, flushViewport] = useDebouncedValue(
    viewport,
    DEBOUNCE_VIEWPORT,
  );

  const { imageData, computing } = useMandelbrot(
    canvasSize.width,
    canvasSize.height,
    debouncedViewport,
    debouncedMaxIter,
  );

  const zoomIn = useCallback(
    () => setViewport((v) => ({ ...v, scale: v.scale * ZOOM_IN_FACTOR })),
    [setViewport],
  );
  const zoomOut = useCallback(
    () => setViewport((v) => ({ ...v, scale: v.scale * ZOOM_OUT_FACTOR })),
    [setViewport],
  );

  const moveAmount = useCallback(
    (scale: number) => scale * MOVE_SCALE_FACTOR,
    [],
  );
  const moveUp = useCallback(
    () => setViewport((v) => ({ ...v, y: v.y - moveAmount(v.scale) })),
    [setViewport],
  );
  const moveDown = useCallback(
    () => setViewport((v) => ({ ...v, y: v.y + moveAmount(v.scale) })),
    [setViewport],
  );
  const moveLeft = useCallback(
    () => setViewport((v) => ({ ...v, x: v.x - moveAmount(v.scale) })),
    [setViewport],
  );
  const moveRight = useCallback(
    () => setViewport((v) => ({ ...v, x: v.x + moveAmount(v.scale) })),
    [setViewport],
  );
  const handleResize = useCallback(
    (w: number, h: number) => setCanvasSize({ width: w, height: h }),
    [],
  );
  const onReset = useCallback(() => {
    reset();
    flushViewport(INITIAL_VIEWPORT);
  }, [reset, flushViewport]);

  return (
    <div className={styles['container']}>
      <MandelbrotCanvas
        imageData={imageData}
        computing={computing}
        canvasRef={canvasRef}
        onResize={handleResize}
      />
      <Controls
        maxIter={maxIter}
        setMaxIter={setMaxIter}
        onReset={onReset}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onMoveUp={moveUp}
        onMoveDown={moveDown}
        onMoveLeft={moveLeft}
        onMoveRight={moveRight}
      />
      <Meta
        viewport={viewport}
        rendering={debouncedViewport}
        computing={computing}
      />
    </div>
  );
};

export default ComplexMandelbrot;
