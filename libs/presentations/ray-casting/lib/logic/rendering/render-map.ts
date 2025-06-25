import { RaycasterState, ControlState } from '../../types';
import { renderMapBackground } from './render-map-background';
import { drawCameraPlane } from './map-drawing/draw-camera-plane';
import { drawReferenceLineIfNeeded } from './map-drawing/draw-reference-line';
import { drawRays } from './map-drawing/draw-rays';
import { drawPlayer } from './map-drawing/draw-player';

export function renderMap(
  mapCanvas: HTMLCanvasElement,
  gameCanvas: HTMLCanvasElement,
  state: RaycasterState,
  controlState: ControlState,
  rayCount: number,
  showPerpDistances: boolean
): void {
  const ctx = mapCanvas.getContext('2d');
  if (!ctx) return;

  const width = mapCanvas.width;
  const height = mapCanvas.height;
  const mapWidth = state.map[0].length;
  const mapHeight = state.map.length;
  const cellWidth = width / mapWidth;
  const cellHeight = height / mapHeight;

  renderMapBackground(mapCanvas, state);

  drawCameraPlane(ctx, state, cellWidth, cellHeight);

  const dirNormalized = drawReferenceLineIfNeeded(ctx, state, showPerpDistances, cellWidth, cellHeight, width, height);

  drawRays(ctx, gameCanvas, state, rayCount, showPerpDistances, cellWidth, cellHeight, dirNormalized);

  drawPlayer(ctx, state, cellWidth, cellHeight);
}
