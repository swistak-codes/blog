import { Vector2, RaycasterState } from '../../types';

export interface MapRaycastResult {
  hitX: number;
  hitY: number;
  distance: number;
  side: number;
}

export function castRayForMap(
  rayDir: Vector2,
  state: RaycasterState
): MapRaycastResult | null {
  let mapX = Math.floor(state.pos[0]);
  let mapY = Math.floor(state.pos[1]);
  const deltaDist: Vector2 = [Math.abs(1 / rayDir[0]), Math.abs(1 / rayDir[1])];
  let stepX: number, sideDist: number;
  if (rayDir[0] < 0) {
    stepX = -1;
    sideDist = (state.pos[0] - mapX) * deltaDist[0];
  } else {
    stepX = 1;
    sideDist = (mapX + 1 - state.pos[0]) * deltaDist[0];
  }
  let stepY: number, sideDistY: number;
  if (rayDir[1] < 0) {
    stepY = -1;
    sideDistY = (state.pos[1] - mapY) * deltaDist[1];
  } else {
    stepY = 1;
    sideDistY = (mapY + 1 - state.pos[1]) * deltaDist[1];
  }
  let hit = 0;
  let side = 0;
  while (hit === 0) {
    if (sideDist < sideDistY) {
      sideDist += deltaDist[0];
      mapX += stepX;
      side = 0;
    } else {
      sideDistY += deltaDist[1];
      mapY += stepY;
      side = 1;
    }
    if (
      mapY >= 0 &&
      mapY < state.map.length &&
      mapX >= 0 &&
      mapX < state.map[0].length
    ) {
      hit = state.map[mapY][mapX];
    } else {
      break;
    }
  }
  if (hit > 0) {
    const distance =
      side === 0
        ? (mapX - state.pos[0] + (1 - stepX) / 2) / rayDir[0]
        : (mapY - state.pos[1] + (1 - stepY) / 2) / rayDir[1];
    const hitX =
      side === 0 ? mapX + (1 - stepX) / 2 : state.pos[0] + rayDir[0] * distance;
    const hitY =
      side === 1 ? mapY + (1 - stepY) / 2 : state.pos[1] + rayDir[1] * distance;
    return { hitX, hitY, distance, side };
  }
  return null;
}
