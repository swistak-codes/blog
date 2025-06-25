import { RaycasterState, ControlState, Vector2 } from '../../../types';
import { castRayForMap } from '../../raycasting/cast-ray-for-map';
import { RENDER_COLORS } from '../../../constants';

export function drawRays(
  ctx: CanvasRenderingContext2D,
  gameCanvas: HTMLCanvasElement,
  state: RaycasterState,
  rayCount: number,
  showPerpDistances: boolean,
  cellWidth: number,
  cellHeight: number,
  dirNormalized: Vector2 | null
): void {
  const playerX = state.pos[0] * cellWidth;
  const playerY = state.pos[1] * cellHeight;

  const skipFactor = rayCount > 64 ? Math.max(1, Math.floor(rayCount / 64)) : 1;

  const rayPaths: { hitX: number; hitY: number }[] = [];
  const perpPaths: {
    hitX: number;
    hitY: number;
    perpX: number;
    perpY: number
  }[] = [];

  for (let i = 0; i < rayCount; i += skipFactor) {
    if (!gameCanvas) continue;

    const x = (i / (rayCount - 1)) * gameCanvas.width;
    const cameraX = (2 * x) / gameCanvas.width - 1;
    const rayDir: Vector2 = [
      state.dir[0] + state.plane[0] * cameraX,
      state.dir[1] + state.plane[1] * cameraX,
    ];

    const rayResult = castRayForMap(rayDir, state);
    if (rayResult) {
      const { hitX, hitY } = rayResult;
      const hitCanvasX = hitX * cellWidth;
      const hitCanvasY = hitY * cellHeight;

      rayPaths.push({ hitX: hitCanvasX, hitY: hitCanvasY });

      if (showPerpDistances && dirNormalized) {
        const hitVectorCanvas: Vector2 = [
          hitCanvasX - playerX,
          hitCanvasY - playerY,
        ];

        const dirCanvasScale = cellWidth;
        const dirCanvasNormalized: Vector2 = [
          dirNormalized[0] * dirCanvasScale,
          dirNormalized[1] * dirCanvasScale,
        ];

        const dotProduct =
          (hitVectorCanvas[0] * dirCanvasNormalized[0] +
            hitVectorCanvas[1] * dirCanvasNormalized[1]) /
          (dirCanvasScale * dirCanvasScale);

        const perpCanvasX = playerX + dirNormalized[0] * dotProduct * dirCanvasScale;
        const perpCanvasY = playerY + dirNormalized[1] * dotProduct * dirCanvasScale;

        perpPaths.push({
          hitX: hitCanvasX,
          hitY: hitCanvasY,
          perpX: perpCanvasX,
          perpY: perpCanvasY,
        });
      }
    }
  }

  if (rayPaths.length > 0) {
    ctx.strokeStyle = RENDER_COLORS.ray;
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();

    for (const ray of rayPaths) {
      ctx.moveTo(playerX, playerY);
      ctx.lineTo(ray.hitX, ray.hitY);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = RENDER_COLORS.hitPoint;
    ctx.beginPath();
    for (const ray of rayPaths) {
      ctx.moveTo(ray.hitX + 2, ray.hitY);
      ctx.arc(ray.hitX, ray.hitY, 2, 0, 2 * Math.PI);
    }
    ctx.fill();
  }

  if (perpPaths.length > 0) {
    ctx.strokeStyle = RENDER_COLORS.perpendicularDistance;
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();

    for (const perp of perpPaths) {
      ctx.moveTo(perp.hitX, perp.hitY);
      ctx.lineTo(perp.perpX, perp.perpY);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = RENDER_COLORS.perpendicularDistance;
    ctx.beginPath();
    for (const perp of perpPaths) {
      ctx.moveTo(perp.perpX + 3, perp.perpY);
      ctx.arc(perp.perpX, perp.perpY, 3, 0, 2 * Math.PI);
    }
    ctx.fill();
  }
}
