import cytoscape, { Core } from 'cytoscape';
import cytoscapeEdgehandles from 'cytoscape-edgehandles';

cytoscape.use(cytoscapeEdgehandles);

export const configureEdgeEditing = (diagram: Core) => {
  return diagram.edgehandles({
    disableBrowserGestures: true,
    noEdgeEventsInDraw: true,
    snap: true,
    hoverDelay: 150,
    snapFrequency: 15,
    snapThreshold: 10,
  });
};
