import { Node } from 'reactflow';
import { random } from 'lodash';
import { CONTROL_POINT } from '../../utils/consts';
import { nanoid } from 'nanoid';

export const createControlPointNode = (): Node => ({
  id: nanoid(),
  data: {
    order: 0,
  },
  position: {
    x: random(0, 500, false),
    y: random(0, 500, false),
  },
  zIndex: 2,
  type: CONTROL_POINT,
  selectable: true,
  draggable: true,
});
