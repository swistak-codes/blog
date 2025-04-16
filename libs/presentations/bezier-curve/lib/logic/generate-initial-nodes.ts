import { Node } from 'reactflow';
import { createControlPointNode } from './mappers/create-control-point-node';
import { sortBy } from 'lodash';
import { fixControlPoints } from './fix-control-points';

export const generateInitialNodes = () => {
  const result: Node[] = [];
  for (let i = 0; i < 4; i++) {
    result.push(createControlPointNode());
  }
  const sorted = sortBy(result, (value) => value.position.x);
  return fixControlPoints(sorted);
};
