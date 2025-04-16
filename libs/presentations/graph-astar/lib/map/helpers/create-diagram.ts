/* eslint-disable @typescript-eslint/no-non-null-assertion,@typescript-eslint/ban-ts-comment */
import cytoscape, { ElementGroup, NodeDataDefinition } from 'cytoscape';
// using local copy due to error after upgrading to next 15
// import cytoscapeLeaflet from 'cytoscape-leaflet';
import cytoscapeLeaflet from '../cytoscape-leaflet';
import { MapNodeInfo } from '../types';
import { Edge } from '../../algorithms/types';
import L, { LatLng } from 'leaflet';
import { MapGraph } from '../../algorithms/graph/map-graph';
import { diagramStyle } from './diagram-style';

const MIN_ZOOM = 10;
const MAX_ZOOM = 15;

const MIN_NODE_SIZE = 5;
const MAX_NODE_SIZE = 20;

cytoscape.use(cytoscapeLeaflet);

export const createDiagram = (
  target: HTMLDivElement,
  nodes: MapNodeInfo[],
  edges: Edge<MapNodeInfo>[]
) => {
  const cy = cytoscape({
    container: target,
    elements: [
      ...nodes.map((node) => ({
        group: 'nodes' as ElementGroup,
        data: node as NodeDataDefinition,
      })),
      ...edges.map((edge) => ({
        group: 'edges' as ElementGroup,
        data: {
          source: edge.source.id,
          target: edge.target.id,
          id: MapGraph.getEdgeKey(edge.source, edge.target),
        },
      })),
    ],
    style: diagramStyle,
    autoungrabify: true,
    autounselectify: true,
  });

  cy.container()?.setAttribute('id', 'graph');
  cy.data('nodeSize', MIN_NODE_SIZE);
  cy.on('mouseover', '*', (e) => {
    e.target.addClass('hover');
    e.cy.container()!.style.cursor = 'pointer';
  });
  cy.on('mouseout', '*', (e) => {
    e.target.removeClass('hover');
    e.cy.container()!.style.cursor = 'default';
  });

  const cyMap = cy.L(
    { minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM },
    {
      getPosition: (node) => {
        const lng = node.data('lon');
        const lat = node.data('lat');
        return typeof lng === 'number' && typeof lat === 'number'
          ? new LatLng(lat, lng)
          : null;
      },
      animate: false,
    }
  );
  L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(cyMap.map!);

  cyMap.map?.on('zoomend', () => {
    const zoom = cyMap.map!.getZoom();
    const scale = (zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM);
    const nodeSize = MIN_NODE_SIZE + (MAX_NODE_SIZE - MIN_NODE_SIZE) * scale;

    cy.data('nodeSize', nodeSize);
  });

  return {
    cy,
    destroy: () => {
      cyMap.destroy();
      cy.destroy();
    },
  };
};
