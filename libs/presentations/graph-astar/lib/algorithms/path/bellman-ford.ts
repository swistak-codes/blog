/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Graph } from '../graph/graph';
import { Algorithm, MapPoint, Point } from '../types';
import { constructShortestPath } from './construct-shortest-path';

const traverse = <TNode, TPoint extends Point | MapPoint>(
  graph: Graph<TNode, TPoint>,
  start: TNode
) => {
  const vertices = graph.getAllNodes();
  const edges = graph.getAllEdges();

  const previous = new Map<TNode, TNode | null>(vertices.map((x) => [x, null]));
  const distance = new Map(vertices.map((x) => [x, Number.POSITIVE_INFINITY]));
  distance.set(start, 0);

  let iterations = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    for (const { source, target } of edges) {
      iterations++;
      const newDistance =
        distance.get(source)! + graph.getEdgeWeight(source, target);

      if (distance.get(target)! > newDistance) {
        distance.set(target, newDistance);
        previous.set(target, source);
      }
    }
  }

  return {
    distance,
    previous,
    iterations,
  };
};

export const bellmanFord: Algorithm = (graph, from, to) => {
  const { previous, distance, iterations } = traverse(graph, from);
  const path = constructShortestPath(previous, from, to);

  return {
    path,
    iterations,
    distances: distance,
    distance: distance.get(to)!,
  };
};
