import { Edge } from 'reactflow';
import { BEZIER_EDGE } from '../../utils/consts';
import { nanoid } from 'nanoid';

export const createBezierEdge = (from: string, to: string): Edge => ({
  id: nanoid(),
  source: from,
  target: to,
  type: BEZIER_EDGE,
});
