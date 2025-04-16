import { NodeTypes } from 'reactflow';
import { BEZIER_POINT, CONTROL_POINT } from '../../utils/consts';
import { BezierNode } from './bezier-node';
import { ControlPointNode } from './control-point-node';

export const nodeTypes: NodeTypes = {
  [BEZIER_POINT]: BezierNode,
  [CONTROL_POINT]: ControlPointNode,
};
