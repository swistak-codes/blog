import { BaseArrayGraph } from './base-array-graph';
import { MazeCellInfo } from '../../maze/types';

export class MazeGraph extends BaseArrayGraph<MazeCellInfo> {
  getNeighbors(node: MazeCellInfo): MazeCellInfo[] {
    const result = [];
    if (!node.top) {
      result.push(this.graph[node.y - 1][node.x]);
    }
    if (!node.bottom) {
      result.push(this.graph[node.y + 1][node.x]);
    }
    if (!node.left) {
      result.push(this.graph[node.y][node.x - 1]);
    }
    if (!node.right) {
      result.push(this.graph[node.y][node.x + 1]);
    }
    return result;
  }
}
