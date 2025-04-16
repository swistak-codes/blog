import { Graph } from './graph';
import { MapNodeInfo } from '../../map/types';
import { Edge, MapPoint } from '../types';

export class MapGraph implements Graph<MapNodeInfo, MapPoint> {
  private readonly edges: Record<string, string[]>;

  constructor(
    private readonly nodes: Record<string, MapNodeInfo>,
    edges: Record<string, string[]>,
    private readonly weights: Record<string, number>
  ) {
    this.edges = Object.fromEntries(
      Object.entries(edges)
        .map(([key, targets]) => [key, targets.filter((x) => x !== key)])
        .filter((x) => x[1].length > 0)
    );
  }

  get nodeCount() {
    return Object.keys(this.nodes).length;
  }

  getAllNodes(): MapNodeInfo[] {
    return Object.values(this.nodes);
  }

  getAllEdges(): Edge<MapNodeInfo>[] {
    return Object.entries(this.edges).flatMap(([source, targetList]) =>
      targetList.map((target) => ({
        source: this.nodes[source],
        target: this.nodes[target],
      }))
    );
  }

  getNeighbors(node: MapNodeInfo): MapNodeInfo[] {
    return this.edges[node.id].map((x) => this.nodes[x]);
  }

  getEdgeWeight(from: MapNodeInfo, to: MapNodeInfo): number {
    return this.weights[MapGraph.getEdgeKey(from, to)];
  }

  nodeToPoint(node: MapNodeInfo): MapPoint {
    return {
      lon: node.lon,
      lat: node.lat,
    };
  }

  static getEdgeKey(source: MapNodeInfo, target: MapNodeInfo) {
    return `${source.id},${target.id}`;
  }
}
