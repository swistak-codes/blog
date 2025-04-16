/* eslint-disable @typescript-eslint/no-explicit-any */
import { Core, ElementGroup } from 'cytoscape';
import type GraphType from 'graphology-types';

const generatorNameToFactory = new Map<string, any>([
  ['Empty', () => import('graphology-generators/classic/empty')],
  ['Complete', () => import('graphology-generators/classic/complete')],
  ['Ladder', () => import('graphology-generators/classic/ladder')],
  ['Path', () => import('graphology-generators/classic/path')],
  [
    'Caveman',
    () => import('graphology-generators/community/connected-caveman'),
  ],
  ['Zachary', () => import('graphology-generators/social/karate-club')],
]);

export const generateGraph = async (
  name: string,
  configuration: unknown[],
  diagram: Core,
  isLoadingCallback: (value: boolean) => void
) => {
  isLoadingCallback(true);
  const Graph = (await import('graphology')).default;
  diagram.remove(diagram.nodes());
  if (generatorNameToFactory.has(name)) {
    const generatorFactory = generatorNameToFactory.get(name);
    const generator = (await generatorFactory()).default;
    const graph = generator(Graph, ...configuration) as GraphType;
    const cyNodes = graph.mapNodes((id) => ({
      group: 'nodes' as ElementGroup,
      data: { id },
    }));
    const cyEdges = graph.mapEdges((id, _, source, target) => ({
      group: 'edges' as ElementGroup,
      data: { id, source, target },
    }));
    diagram.add([...cyNodes, ...cyEdges]);
  }
  isLoadingCallback(false);
};
