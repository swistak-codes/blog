import { RaycasterState } from '../../../types';
import { RENDER_COLORS } from '../../../constants';

export function drawCameraPlane(
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

  const planeScale = cellWidth * dirLength;
  ctx.strokeStyle = RENDER_COLORS.cameraPlane;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(
    planeCenterX - state.plane[0] * planeScale,
    planeCenterY - state.plane[1] * planeScale
  );
  ctx.lineTo(
    planeCenterX + state.plane[0] * planeScale,
    planeCenterY + state.plane[1] * planeScale
  );
  ctx.stroke();
}
