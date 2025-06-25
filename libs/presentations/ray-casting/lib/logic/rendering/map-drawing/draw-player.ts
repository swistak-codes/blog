import { RaycasterState } from '../../../types';
import { RENDER_COLORS } from '../../../constants';

export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  state: RaycasterState,
  cellWidth: number,
  cellHeight: number
): void {
  const playerX = state.pos[0] * cellWidth;
  const playerY = state.pos[1] * cellHeight;
  const dirLength = Math.sqrt(
    state.dir[0] * state.dir[0] + state.dir[1] * state.dir[1]
  );
  const planeDistance = cellWidth * dirLength;
  const planeCenterX = playerX + state.dir[0] * planeDistance;
  const planeCenterY = playerY + state.dir[1] * planeDistance;

  ctx.fillStyle = RENDER_COLORS.player;
  ctx.beginPath();
  ctx.arc(
    playerX,
    playerY,
    Math.min(cellWidth, cellHeight) * 0.3,
    0,
    2 * Math.PI
  );
  ctx.fill();

  ctx.strokeStyle = RENDER_COLORS.playerDirection;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(playerX, playerY);
  ctx.lineTo(planeCenterX, planeCenterY);
  ctx.stroke();
}
