/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Graph } from '../graph/graph';
import { Algorithm, MapPoint, Point } from '../types';
import { constructShortestPath } from './construct-shortest-path';

const traverse = <TNode, TPoint extends Point | MapPoint>(
  graph: Graph<TNode, TPoint>,
  startNode: TNode
) => {
  const visited = new Set<TNode>();
  const queue = [startNode];
  const previous = new Map<TNode, TNode | null>(
    graph.getAllNodes().map((x) => [x, null])
  );
  let iterations = 0;
  while (queue.length > 0) {
    iterations++;
    const node = queue.shift()!;
    if (visited.has(node)) {
      continue;
    }
    visited.add(node);
    for (const neighbor of graph.getNeighbors(node)) {
      iterations++;
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        if (previous.get(neighbor) == null) {
          previous.set(neighbor, node);
        }
      }
    }
  }
  return { previous, iterations };
};

export const bfs: Algorithm = (graph, from, to) => {
  const { previous, iterations } = traverse(graph, from);
  const path = constructShortestPath(previous, from, to);

  return {
    path,
    iterations,
    distance: path.length + 1,
  };
};
