import { Graph } from './graph/graph';

export type Point = {
  x: number;
  y: number;
};

export type MapPoint = {
  lat: number;
  lon: number;
};

export type DistanceHeuristic<T extends Point | MapPoint> = (
  start: T,
  end: T
) => number;

export type AlgorithmResult<TNode> = {
  path: TNode[];
  iterations: number;
  distances?: Map<TNode, number>;
  heuristicDistance?: number;
  distance: number;
};

export type Algorithm = <TNode, TPoint extends Point | MapPoint>(
  graph: Graph<TNode, TPoint>,
  from: TNode,
  to: TNode,
  heuristic: DistanceHeuristic<TPoint>
) => AlgorithmResult<TNode>;

export type Edge<TNode> = {
  source: TNode;
  target: TNode;
};
