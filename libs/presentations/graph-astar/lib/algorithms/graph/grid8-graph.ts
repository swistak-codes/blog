import { Grid4Graph } from './grid4-graph';
import { GridCellInfo } from '../../grid/types';

export class Grid8Graph extends Grid4Graph {
  override getNeighbors(node: GridCellInfo): GridCellInfo[] {
    const result = super.getNeighbors(node);
    if (
      node.x > 0 &&
      node.y > 0 &&
      !this.graph[node.y - 1][node.x - 1].isBlocked
    ) {
      result.push(this.graph[node.y - 1][node.x - 1]);
    }
    if (
      node.x < this.graph[0].length - 1 &&
      node.y > 0 &&
      !this.graph[node.y - 1][node.x + 1].isBlocked
    ) {
      result.push(this.graph[node.y - 1][node.x + 1]);
    }
    if (
      node.x > 0 &&
      node.y < this.graph.length - 1 &&
      !this.graph[node.y + 1][node.x - 1].isBlocked
    ) {
      result.push(this.graph[node.y + 1][node.x - 1]);
    }
    if (
      node.x > this.graph[0].length - 1 &&
      node.y < this.graph.length - 1 &&
      !this.graph[node.y + 1][node.x + 1].isBlocked
    ) {
      result.push(this.graph[node.y + 1][node.x + 1]);
    }
    return result;
  }
}
