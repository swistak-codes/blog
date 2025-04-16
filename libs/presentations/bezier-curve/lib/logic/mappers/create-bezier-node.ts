import { Node } from 'reactflow';
import { BEZIER_POINT } from '../../utils/consts';
import { nanoid } from 'nanoid';

export const createBezierNode = (position: [number, number]): Node => ({
  id: nanoid(),
  position: { x: position[0], y: position[1] },
  draggable: false,
  type: BEZIER_POINT,
  zIndex: 1,
  data: {},
  selectable: false,
});
