import { ElementDefinition } from 'cytoscape';

export const getInitialGraph = (): ElementDefinition[] => [
  { group: 'nodes', data: { id: '0', color: 'white' } },
  { group: 'nodes', data: { id: '1', color: 'white' } },
  { group: 'nodes', data: { id: '2', color: 'white' } },
  { group: 'nodes', data: { id: '3', color: 'white' } },
  { group: 'nodes', data: { id: '4', color: 'white' } },
  { group: 'nodes', data: { id: '5', color: 'white' } },
  { group: 'edges', data: { id: 'e0', source: '0', target: '1' } },
  { group: 'edges', data: { id: 'e1', source: '0', target: '2' } },
  { group: 'edges', data: { id: 'e2', source: '1', target: '3' } },
  { group: 'edges', data: { id: 'e3', source: '2', target: '4' } },
  { group: 'edges', data: { id: 'e4', source: '2', target: '5' } },
  { group: 'edges', data: { id: 'e5', source: '5', target: '0' } },
  { group: 'edges', data: { id: 'e6', source: '3', target: '5' } },
];
