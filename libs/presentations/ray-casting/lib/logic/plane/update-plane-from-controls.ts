import { RaycasterState, ControlState } from '../../types';

export function updatePlaneFromControls(
  state: RaycasterState,
  planeWidth: number,
  dirLength: number
): void {
  const width = Math.max(0.2, Math.min(1.5, planeWidth));

  let dir = state.dir;

  const len = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);
  if (len > 0) {
    dir = [
      (dir[0] / len) * dirLength,
      (dir[1] / len) * dirLength,
    ];
    state.dir = dir;
  }

  const perp = [dir[1], -dir[0]];
  const perpLen = Math.sqrt(perp[0] * perp[0] + perp[1] * perp[1]);
  state.plane = [
    (perp[0] / perpLen) * width,
    (perp[1] / perpLen) * width,
  ];
}
