import cytoscape from 'cytoscape';
import { configureEdgeEditing } from './configure-edge-editing';
import { configureLayout } from './configure-layout';
import { configureStyles } from './configure-styles';

export const createDiagram = (targetElement: HTMLDivElement) => {
  const diagram = cytoscape({
    container: targetElement,
    selectionType: 'single',
    boxSelectionEnabled: false,
    autoungrabify: true,
  });

  const edgeHandles = configureEdgeEditing(diagram);
  configureLayout(diagram);
  configureStyles(diagram);

  return {
    diagram,
    edgeHandles,
  };
};
