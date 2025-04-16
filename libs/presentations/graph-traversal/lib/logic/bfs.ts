import { Graph } from './graph';
import { AlgorithmGenerator } from '../types';

export function* bfs(graph: Graph, start: string): AlgorithmGenerator {
  const result: string[] = [];
  for (const v of graph.vertices()) {
    graph.setColor(v, 'white');
  }
  yield result;

  graph.setColor(start, 'gray');
  const queue: string[] = [];
  queue.push(start);

  while (queue.length > 0) {
    const v = queue[0];
    result.push(v);
    yield result;

    for (const w of graph.neighbors(v)) {
      if (graph.color(w) === 'white') {
        graph.setColor(w, 'gray');
        queue.push(w);
        yield result;
      }
    }

    queue.shift();
    graph.setColor(v, 'black');
    yield result;
  }

  return result;
}
