import { Graph } from './logic/graph';

export type TraversalType = 'DFS' | 'BFS';

export type AlgorithmGenerator = Generator<string[]>;

export type AlgorithmType = (graph: Graph, start: string) => AlgorithmGenerator;
