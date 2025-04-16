import { BaseArrayGraph } from './base-array-graph';
import { GridCellInfo } from '../../grid/types';

export class Grid4Graph extends BaseArrayGraph<GridCellInfo> {
  getNeighbors(node: GridCellInfo): GridCellInfo[] {
    const result = [];
    if (node.y > 0 && !this.graph[node.y - 1][node.x].isBlocked) {
      result.push(this.graph[node.y - 1][node.x]);
    }
    if (
      node.y < this.graph.length - 1 &&
      !this.graph[node.y + 1][node.x].isBlocked
    ) {
      result.push(this.graph[node.y + 1][node.x]);
    }
    if (node.x > 0 && !this.graph[node.y][node.x - 1].isBlocked) {
      result.push(this.graph[node.y][node.x - 1]);
    }
    if (
      node.x < this.graph[0].length - 1 &&
      !this.graph[node.y][node.x + 1].isBlocked
    ) {
      result.push(this.graph[node.y][node.x + 1]);
    }
    return result;
  }
}
