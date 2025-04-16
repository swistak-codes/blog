import cytoscape from 'cytoscape';
import { configureEdgeEditing } from './configure-edge-editing';
import { configureStyles } from './configure-styles';

export const createDiagram = (targetElement: HTMLDivElement) => {
  const diagram = cytoscape({
    container: targetElement,
  });

  configureEdgeEditing(diagram);
  configureStyles(diagram);

  return diagram;
};
