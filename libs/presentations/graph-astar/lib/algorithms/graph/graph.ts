import { Edge, MapPoint, Point } from '../types';

export type Graph<TNode, TPoint extends Point | MapPoint> = {
  nodeCount: number;
  getAllNodes(): TNode[];
  getAllEdges(): Edge<TNode>[];
  getNeighbors(node: TNode): TNode[];
  getEdgeWeight(source: TNode, target: TNode): number;
  nodeToPoint(node: TNode): TPoint;
};
