import { Graph } from './graph';
import { Edge, Point } from '../types';

export abstract class BaseArrayGraph<TNode extends Point>
  implements Graph<TNode, Point>
{
  private edges: { source: TNode; target: TNode }[] | null = null;

  abstract getNeighbors(node: TNode): TNode[];

  constructor(protected readonly graph: TNode[][]) {}

  get nodeCount() {
    return this.graph.length * this.graph[0].length;
  }

  getAllNodes(): TNode[] {
    return this.graph.flat();
  }

  getAllEdges(): Edge<TNode>[] {
    if (!this.edges) {
      const allNodes = this.getAllNodes();
      const result = new Map(allNodes.map((x) => [x, new Set<TNode>()]));

      for (const node of allNodes) {
        const neighbors = this.getNeighbors(node);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const set = result.get(node)!;
        neighbors.forEach((x) => set.add(x));
      }

      this.edges = [...result.entries()].flatMap(([source, toSet]) =>
        [...toSet].map((target) => ({ source, target }))
      );
    }
    return [...this.edges];
  }

  getEdgeWeight(from: TNode, to: TNode): number {
    return this.getNeighbors(from).includes(to) ? 1 : 0;
  }

  nodeToPoint(node: TNode): Point {
    return {
      x: node.x,
      y: node.y,
    };
  }
}
