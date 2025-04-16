import { Core } from 'cytoscape';

export const configureStyles = (diagram: Core) => {
  diagram
    .style()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .clear()
    .selector('node')
    .style({
      'border-width': '2px',
      'border-style': 'solid',
      'border-color': 'black',
      label: 'data(id)',
      'text-halign': 'center',
      'text-valign': 'center',
    })
    .selector('node[color="white"]')
    .style({
      'background-color': 'white',
      color: 'black',
    })
    .selector('node[color="gray"]')
    .style({
      'background-color': 'gray',
      color: 'black',
    })
    .selector('node[color="black"]')
    .style({
      'background-color': 'black',
      color: 'white',
    })
    .selector('node:selected')
    .style({
      'border-color': 'red',
      'border-width': '6px',
    })
    .selector('edge')
    .style({
      'line-fill': 'linear-gradient',
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
      width: '1',
      'curve-style': 'bezier',
    });
};
