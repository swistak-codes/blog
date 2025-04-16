import { NodeTypes } from 'reactflow';
import { POINT } from '../../utils/consts';
import { PointNode } from './point-node';

export const nodeTypes: NodeTypes = {
  [POINT]: PointNode,
};
