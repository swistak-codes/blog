import { Core } from 'cytoscape';

export class Graph {
  constructor(
    private readonly nodes: string[],
    private readonly edges: [string, string][],
    private readonly diagram: Core
  ) {}

  vertices() {
    return [...this.nodes];
  }

  neighbors(vertex: string) {
    return this.edges.filter(([from]) => from === vertex).map(([, to]) => to);
  }

  setColor(vertex: string, color: string) {
    this.diagram.getElementById(vertex).data('color', color);
  }

  color(vertex: string) {
    return this.diagram.getElementById(vertex).data('color');
  }
}
