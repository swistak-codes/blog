import { RENDER_COLORS } from '../../../constants';

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cellWidth: number,
  cellHeight: number,
  mapWidth: number,
  mapHeight: number
): void {
  ctx.strokeStyle = RENDER_COLORS.grid;
  ctx.lineWidth = 1;

  for (let x = 0; x <= mapWidth; x++) {
    ctx.beginPath();
    ctx.moveTo(x * cellWidth, 0);
    ctx.lineTo(x * cellWidth, height);
    ctx.stroke();
  }

  for (let y = 0; y <= mapHeight; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * cellHeight);
    ctx.lineTo(width, y * cellHeight);
    ctx.stroke();
  }
}
