import { RaycasterState } from '../../../types';

export function drawMapWalls(
  ctx: CanvasRenderingContext2D,
  state: RaycasterState,
  cellWidth: number,
  cellHeight: number,
  mapWidth: number,
  mapHeight: number
): void {
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const cell = state.map[y][x];
      if (cell > 0) {
        ctx.fillStyle = state.textures[cell].light;
        ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
    }
  }
}
