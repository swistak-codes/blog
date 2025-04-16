import { Edge } from 'reactflow';

export const edgesToNodeSet = (edges: Edge[]) => {
  const result = new Set<string>();
  for (const edge of edges) {
    result.add(edge.source);
    result.add(edge.target);
  }
  return result;
};
