import { RaycasterState, RaycasterConfig } from '../../types';

export function moveStep(
  step: number,
  state: RaycasterState,
  config: RaycasterConfig
): void {
  const [x, y] = state.pos;
  const newX = x + state.dir[0] * step * config.moveSpeed;
  const newY = y + state.dir[1] * step * config.moveSpeed;
  if (state.map[Math.floor(newY)][Math.floor(newX)] === 0) {
    state.pos = [newX, newY];
  }
}
