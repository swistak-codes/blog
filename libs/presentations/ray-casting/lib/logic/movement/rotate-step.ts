import { RaycasterState, RaycasterConfig } from '../../types';

export function rotateStep(
  dir: number,
  state: RaycasterState,
  config: RaycasterConfig
): void {
  const [dirX, dirY] = state.dir;
  const [planeX, planeY] = state.plane;
  const speed = dir * config.rotationSpeed;
  state.dir = [
    dirX * Math.cos(speed) - dirY * Math.sin(speed),
    dirX * Math.sin(speed) + dirY * Math.cos(speed),
  ];
  state.plane = [
    planeX * Math.cos(speed) - planeY * Math.sin(speed),
    planeX * Math.sin(speed) + planeY * Math.cos(speed),
  ];
}
