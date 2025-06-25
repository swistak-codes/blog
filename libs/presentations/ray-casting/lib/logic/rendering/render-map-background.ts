import { RaycasterState } from '../../types';
import { RENDER_COLORS } from '../../constants';
import { drawGrid } from './map-drawing/draw-grid';
import { drawMapWalls } from './map-drawing/draw-map-walls';

let cachedMapBackground: ImageData | null = null;
let lastMapHash: string | null = null;

export function renderMapBackground(
  mapCanvas: HTMLCanvasElement,
  state: RaycasterState
): void {
  const ctx = mapCanvas.getContext('2d');
  if (!ctx) return;

  const width = mapCanvas.width;
  const height = mapCanvas.height;
  const mapWidth = state.map[0].length;
  const mapHeight = state.map.length;
  const cellWidth = width / mapWidth;
  const cellHeight = height / mapHeight;

  const mapHash = JSON.stringify(state.map) + `${width}x${height}`;

  if (cachedMapBackground && lastMapHash === mapHash) {
    ctx.putImageData(cachedMapBackground, 0, 0);
    return;
  }

  ctx.fillStyle = RENDER_COLORS.mapBackground;
  ctx.fillRect(0, 0, width, height);

  drawGrid(ctx, width, height, cellWidth, cellHeight, mapWidth, mapHeight);
  drawMapWalls(ctx, state, cellWidth, cellHeight, mapWidth, mapHeight);

  cachedMapBackground = ctx.getImageData(0, 0, width, height);
  lastMapHash = mapHash;
}

export function invalidateMapCache(): void {
  cachedMapBackground = null;
  lastMapHash = null;
}
