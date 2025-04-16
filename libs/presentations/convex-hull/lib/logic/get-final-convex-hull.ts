import { Edge, Node } from 'reactflow';
import { computeConvexHull } from './compute-convex-hull';

export const getFinalConvexHullFromIterator = (
  iterator: ReturnType<typeof computeConvexHull>
) => {
  let result: Edge[] = [];
  for (const partial of iterator) {
    result = partial;
  }
  return result;
};
export const getFinalConvexHull = (nodes: Node[]) => {
  return getFinalConvexHullFromIterator(computeConvexHull(nodes));
};
