import { Edge, Node } from 'reactflow';
import { deCasteljau } from './algorithms/de-casteljau';
import { createBezierNode } from './mappers/create-bezier-node';
import { createBezierEdge } from './mappers/create-bezier-edge';
import { controlPointNodesToPointArrays } from './mappers/control-point-nodes-to-point-arrays';
import { orderBy } from 'lodash';

export const computeBezierCurve = (
  controlPoints: Node[],
  pointsCount: number
) => {
  const sortedPoints = orderBy(controlPoints, (x) => x.data.order);
  const points = controlPointNodesToPointArrays(sortedPoints);

  const nodes: Node[] = [];
  if (controlPoints.length > 0) {
    for (let i = 0; i < pointsCount; i++) {
      const t = i / (pointsCount - 1);
      const point = deCasteljau(t, points);
      nodes.push(createBezierNode(point));
    }
  }

  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const from = nodes[i].id;
    const to = nodes[i + 1].id;
    edges.push(createBezierEdge(from, to));
  }

  return {
    nodes,
    edges,
  };
};
