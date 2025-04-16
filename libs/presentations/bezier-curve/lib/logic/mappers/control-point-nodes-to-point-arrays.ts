import { Node } from 'reactflow';

export const controlPointNodesToPointArrays = (
  controlPoints: Node[]
): [number, number][] => controlPoints.map((x) => [x.position.x, x.position.y]);
