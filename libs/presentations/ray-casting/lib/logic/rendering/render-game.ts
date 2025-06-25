import { RaycasterState, ControlState } from '../../types';
import { castRay } from '../raycasting/cast-ray';
import { RENDER_COLORS } from '../../constants';

export function renderGame(
  gameCanvas: HTMLCanvasElement,
  state: RaycasterState,
  fishEyeCorrection: boolean
): void {
  const ctx = gameCanvas.getContext('2d');
  if (!ctx) return;

  const width = gameCanvas.width;
  const height = gameCanvas.height;

  ctx.fillStyle = RENDER_COLORS.sky;
  ctx.fillRect(0, 0, width, height / 2);
  ctx.fillStyle = RENDER_COLORS.floor;
  ctx.fillRect(0, height / 2, width, height / 2);

  for (let x = 0; x < width; x++) {
    const { distance, hit, side } = castRay(
      x,
      width,
      state,
      fishEyeCorrection
    );
    const lineHeight = height / distance;
    const colorObj = state.textures[hit];
    const fillColor = side ? colorObj.shadow : colorObj.light;
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, (height - lineHeight) / 2, 1, lineHeight);
  }
}
