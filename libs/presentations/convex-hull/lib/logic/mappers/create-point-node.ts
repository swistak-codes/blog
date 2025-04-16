import { Node } from 'reactflow';
import { random } from 'lodash';
import { POINT } from '../../utils/consts';
import { nanoid } from 'nanoid';

export const createPointNode = (): Node => ({
  id: nanoid(),
  data: {},
  position: {
    x: random(0, 500, false),
    y: random(0, 500, false),
  },
  zIndex: 2,
  type: POINT,
  selectable: true,
  draggable: true,
});
