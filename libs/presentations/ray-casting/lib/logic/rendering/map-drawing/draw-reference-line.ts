import { RaycasterState, ControlState, Vector2 } from '../../../types';
import { RENDER_COLORS } from '../../../constants';

export function drawReferenceLineIfNeeded(
  ctx: CanvasRenderingContext2D,
  state: RaycasterState,
  showPerpDistances: boolean,
  cellWidth: number,
  cellHeight: number,
  width: number,
  height: number
): Vector2 | null {
  if (!showPerpDistances) return null;

  const playerX = state.pos[0] * cellWidth;
  const playerY = state.pos[1] * cellHeight;
  const dirLength = Math.sqrt(
    state.dir[0] * state.dir[0] + state.dir[1] * state.dir[1]
  );

  const dirNormalized: Vector2 = [
    state.dir[0] / dirLength,
    state.dir[1] / dirLength,
  ];

  const lineExtent = Math.max(width, height) * 0.8;
  ctx.strokeStyle = RENDER_COLORS.referenceLine;
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(playerX, playerY);
  ctx.lineTo(
    playerX + dirNormalized[0] * lineExtent,
    playerY + dirNormalized[1] * lineExtent
  );
  ctx.stroke();
  ctx.setLineDash([]);

  return dirNormalized;
}
