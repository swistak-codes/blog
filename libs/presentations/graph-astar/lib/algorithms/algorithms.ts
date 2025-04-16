import { Algorithm } from './types';
import { bfs } from './path/bfs';
import { bellmanFord } from './path/bellman-ford';
import { dijkstra } from './path/dijkstra';
import { AStar } from './path/a-star';

export enum Algorithms {
  AStar,
  Bfs,
  BellmanFord,
  Dijkstra,
  DijkstraStop,
}

export const algorithmMap: Record<Algorithms, Algorithm> = {
  [Algorithms.AStar]: AStar,
  [Algorithms.Bfs]: bfs,
  [Algorithms.BellmanFord]: bellmanFord,
  [Algorithms.Dijkstra]: dijkstra(false),
  [Algorithms.DijkstraStop]: dijkstra(true),
};
