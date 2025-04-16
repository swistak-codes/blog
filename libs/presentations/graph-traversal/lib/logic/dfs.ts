import { Graph } from './graph';
import { AlgorithmGenerator } from '../types';

let result: string[] = [];

export function* dfs(graph: Graph, start: string): AlgorithmGenerator {
  result = [];

  for (const v of graph.vertices()) {
    graph.setColor(v, 'white');
  }

  yield result;
  yield* dfsVisit(graph, start);
}

function* dfsVisit(graph: Graph, v: string): AlgorithmGenerator {
  graph.setColor(v, 'gray');
  result.push(v);
  yield result;

  for (const w of graph.neighbors(v)) {
    if (graph.color(w) === 'white') {
      yield* dfsVisit(graph, w);
    }
  }

  graph.setColor(v, 'black');
  yield result;
}
