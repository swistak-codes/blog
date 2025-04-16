/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Algorithm, MapPoint, Point } from '../types';
import { constructShortestPath } from './construct-shortest-path';
import { Graph } from '../graph/graph';
import { FibonacciHeap } from '../fibonacci-heap/fibonacci-heap';
import { Node } from '../fibonacci-heap/node';

const traverse = <TNode, TPoint extends Point | MapPoint>(
  graph: Graph<TNode, TPoint>,
  start: TNode,
  end: TNode,
  breakWhenFound: boolean
) => {
  const vertices = graph.getAllNodes();
  const previous = new Map<TNode, TNode | null>(vertices.map((x) => [x, null]));
  const distance = new Map(vertices.map((x) => [x, Number.POSITIVE_INFINITY]));
  distance.set(start, 0);
  const queue = new FibonacciHeap<number, TNode>();
  const queueNodes = new Map<TNode, Node<number, TNode>>();
  for (const node of vertices) {
    queueNodes.set(node, queue.insert(distance.get(node)!, node));
  }
  let iterations = 0;
  while (!queue.isEmpty()) {
    iterations++;
    const min = queue.extractMinimumWithIterationCount();
    const from = min.node!.value!;
    iterations += min.iterations;
    if (breakWhenFound && from === end) {
      break;
    }
    for (const to of graph.getNeighbors(from)) {
      iterations++;
      const newDistance = distance.get(from)! + graph.getEdgeWeight(from, to);

      if (distance.get(to)! > newDistance) {
        distance.set(to, newDistance);
        previous.set(to, from);
        queue.decreaseKey(queueNodes.get(to)!, newDistance);
      }
    }
  }

  return {
    distance,
    previous,
    iterations,
  };
};

export const dijkstra =
  (breakWhenFound: boolean): Algorithm =>
  (graph, from, to) => {
    const { previous, distance, iterations } = traverse(
      graph,
      from,
      to,
      breakWhenFound
    );
    const path = constructShortestPath(previous, from, to);

    return {
      path,
      iterations,
      distances: distance,
      distance: distance.get(to)!,
    };
  };
