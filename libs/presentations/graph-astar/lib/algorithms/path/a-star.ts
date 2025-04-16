/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Algorithm } from '../types';
import { FibonacciHeap } from '../fibonacci-heap/fibonacci-heap';
import { Node } from '../fibonacci-heap/node';

const constructShortestPath = <TNode>(
  previous: Map<TNode, TNode | null>,
  end: TNode
) => {
  const result: TNode[] = [end];
  let current = end;
  let previousNode = previous.get(current);
  while (previousNode) {
    current = previousNode;
    result.unshift(current);
    previousNode = previous.get(current);
  }
  return result;
};

export const AStar: Algorithm = (graph, start, end, heuristic) => {
  type TNode = typeof start;
  const vertices = graph.getAllNodes();
  const toCheck = new FibonacciHeap<number, TNode>();
  const queueNodes = new Map<TNode, Node<number, TNode>>();
  const previous = new Map<TNode, TNode | null>(vertices.map((x) => [x, null]));
  const distance = new Map(vertices.map((x) => [x, Number.POSITIVE_INFINITY]));
  const predicted = new Map(vertices.map((x) => [x, Number.POSITIVE_INFINITY]));
  const endAsPoint = graph.nodeToPoint(end);

  distance.set(start, 0);
  predicted.set(start, heuristic(graph.nodeToPoint(start), endAsPoint));
  queueNodes.set(start, toCheck.insert(predicted.get(start)!, start));

  let iterations = 0;
  while (!toCheck.isEmpty()) {
    iterations++;
    const min = toCheck.extractMinimumWithIterationCount();
    const from = min.node!.value!;
    iterations += min.iterations;
    queueNodes.delete(from);
    if (from === end) {
      break;
    }
    for (const to of graph.getNeighbors(from)) {
      iterations++;
      const realDistance = distance.get(from)! + graph.getEdgeWeight(from, to);
      if (realDistance < distance.get(to)!) {
        previous.set(to, from);
        distance.set(to, realDistance);
        predicted.set(
          to,
          realDistance + heuristic(graph.nodeToPoint(to), endAsPoint)
        );
        if (queueNodes.has(to)) {
          toCheck.decreaseKey(queueNodes.get(to)!, predicted.get(to)!);
        } else {
          queueNodes.set(to, toCheck.insert(predicted.get(to)!, to));
        }
      }
    }
  }

  const path = constructShortestPath(previous, end);

  return {
    previous,
    iterations,
    path,
    distances: distance,
    heuristicDistance: heuristic(graph.nodeToPoint(start), endAsPoint),
    distance: distance.get(end)!,
  };
};
