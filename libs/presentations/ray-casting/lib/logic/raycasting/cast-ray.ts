import { Vector2, RaycasterState } from '../../types';

export interface RaycastResult {
  distance: number;
  hit: number;
  side: number;
}

export function castRay(
  x: number,
  width: number,
  state: RaycasterState,
  fishEyeCorrection: boolean = true
): RaycastResult {
  const cameraX = (2 * x) / width - 1;
  const rayDir: Vector2 = [
    state.dir[0] + state.plane[0] * cameraX,
    state.dir[1] + state.plane[1] * cameraX,
  ];
  let mapX = Math.floor(state.pos[0]);
  let mapY = Math.floor(state.pos[1]);
  const deltaDist: Vector2 = [Math.abs(1 / rayDir[0]), Math.abs(1 / rayDir[1])];
  let stepX: number, sideDistX: number;
  if (rayDir[0] < 0) {
    stepX = -1;
    sideDistX = (state.pos[0] - mapX) * deltaDist[0];
  } else {
    stepX = 1;
    sideDistX = (mapX + 1 - state.pos[0]) * deltaDist[0];
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
    if (sideDistX < sideDistY) {
      sideDistX += deltaDist[0];
      mapX += stepX;
      side = 0;
    } else {
      sideDistY += deltaDist[1];
      mapY += stepY;
      side = 1;
    }
    hit = state.map[mapY][mapX];
  }
  let distance: number = 0;
  if (fishEyeCorrection) {
    distance =
      side === 0
        ? (mapX - state.pos[0] + (1 - stepX) / 2) / rayDir[0]
        : (mapY - state.pos[1] + (1 - stepY) / 2) / rayDir[1];
  } else {
    const perpDistance =
      side === 0
        ? (mapX - state.pos[0] + (1 - stepX) / 2) / rayDir[0]
        : (mapY - state.pos[1] + (1 - stepY) / 2) / rayDir[1];
    const hitX = state.pos[0] + rayDir[0] * perpDistance;
    const hitY = state.pos[1] + rayDir[1] * perpDistance;
    distance = Math.sqrt(
      (hitX - state.pos[0]) * (hitX - state.pos[0]) +
        (hitY - state.pos[1]) * (hitY - state.pos[1]),
    );
  }
  return { distance, hit, side };
}
