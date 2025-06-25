import { ASPECT } from '../../constants';

export function resizeCanvases(
  gameCanvas: HTMLCanvasElement | null,
  mapCanvas: HTMLCanvasElement | null,
  container: HTMLDivElement | null,
): void {
  if (!gameCanvas || !mapCanvas || !container) return;
  const maxW = container.clientWidth;
  const maxH = container.clientHeight;
  let canvasW = maxW;
  let canvasH = maxW / ASPECT;
  if (canvasH * 2 > maxH) {
    canvasH = maxH / 2;
    canvasW = canvasH * ASPECT;
  }
  gameCanvas.style.width = mapCanvas.style.width = canvasW + 'px';
  gameCanvas.style.height = mapCanvas.style.height = canvasH + 'px';
  gameCanvas.width = mapCanvas.width = Math.round(canvasW);
  gameCanvas.height = mapCanvas.height = Math.round(canvasH);
}
