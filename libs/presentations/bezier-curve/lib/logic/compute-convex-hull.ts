import { Edge, Node } from 'reactflow';
import { grahamScan } from './algorithms/graham-scan';
import { CONVEX_HULL_EDGE } from '../utils/consts';
import { nanoid } from 'nanoid';

export const computeConvexHull = (controlPointNodes: Node[]) => {
  const edgeNodes = grahamScan(controlPointNodes);
  const edges: Edge[] = [];

  for (let i = 0; i < edgeNodes.length; i++) {
    const node1 = edgeNodes[i];
    const node2 = edgeNodes[(i + 1) % edgeNodes.length];

    edges.push({
      id: nanoid(),
      source: node1.id,
      target: node2.id,
      type: CONVEX_HULL_EDGE,
    });
  }

  return edges;
};
