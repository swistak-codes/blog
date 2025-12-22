import styles from './mandelbrot-canvas.module.scss';
import React, { useCallback, useEffect, useRef } from 'react';
import { CANVAS_MIN_WIDTH, CANVAS_MIN_HEIGHT } from '../utils/consts';

interface Props {
  imageData: ImageData | null;
  computing: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onResize?: (width: number, height: number) => void;
}

export const MandelbrotCanvas = ({
  imageData,
  computing,
  canvasRef,
  onResize,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const draw = useCallback(() => {
    const el = canvasRef.current;
    if (!el || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(CANVAS_MIN_WIDTH, Math.floor(rect.width));
    const h = Math.max(CANVAS_MIN_HEIGHT, Math.floor(rect.height));
    el.width = Math.floor(w * dpr);
    el.height = Math.floor(h * dpr);
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
    if (typeof onResize === 'function') onResize(el.width, el.height);
    const ctx = el.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (imageData) {
      try {
        ctx.putImageData(imageData, 0, 0);
      } catch (e) {
        const tmp = document.createElement('canvas');
        tmp.width = imageData.width;
        tmp.height = imageData.height;
        const tctx = tmp.getContext('2d');
        if (tctx) tctx.putImageData(imageData, 0, 0);
        ctx.drawImage(tmp, 0, 0, w, h);
      }
    } else {
      ctx.fillStyle = 'var(--sc--background)';
      ctx.fillRect(0, 0, w, h);
    }
  }, [onResize, imageData]);

  useEffect(() => {
    draw();
  }, [imageData, canvasRef, draw]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      draw();
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [canvasRef, draw]);

  return (
    <div className={styles['wrapper']} ref={containerRef}>
      <canvas ref={canvasRef} className={styles['canvas']} />
      {computing && (
        <div className={styles['overlay']}>
          <i className="ph ph-spinner" aria-hidden />
        </div>
      )}
    </div>
  );
};
