import { NodeSingular } from 'cytoscape';
import { SELECTION_COLOR } from '../../helpers/theme';

export const diagramStyle = [
  {
    selector: 'node',
    style: {
      'border-color': '#000000',
      'border-width': 1,
      'background-color': (ele: NodeSingular) =>
        ele.cy().data('colorDistance') && ele.data('color')
          ? ele.data('color')
          : '#ffffff',
      width: (ele: NodeSingular) => `${ele.cy().data('nodeSize')}px`,
      height: (ele: NodeSingular) => `${ele.cy().data('nodeSize')}px`,
    },
  },
  {
    selector: 'node.hover',
    style: {
      'background-color': SELECTION_COLOR,
    },
  },
  {
    selector: 'node.selected',
    style: {
      'border-color': '#ff0000',
      'border-width': 6,
      'border-opacity': 0.5,
      'background-color': SELECTION_COLOR,
    },
  },
  {
    selector: 'node.path',
    style: {
      'background-color': SELECTION_COLOR,
    },
  },
  {
    selector: 'edge',
    style: {
      'line-color': '#000000',
      width: 1,
    },
  },
  {
    selector: 'edge.path',
    style: {
      'line-color': SELECTION_COLOR,
      width: 5,
    },
  },
];
