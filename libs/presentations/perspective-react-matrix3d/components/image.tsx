import { useStore } from '../hooks/use-store';
import { useShallow } from 'zustand/react/shallow';
import styles from '../react-matrix3d.module.scss';
import { Background, BackgroundVariant, Node, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ImageNode } from './image-node';
import { PointNode } from './point-node';

const nodeTypes = {
  image: ImageNode,
  point: PointNode,
};

const getDefaultNodes = (): Node[] => {
  return [
    {
      id: 'image',
      type: 'image',
      position: { x: 0, y: 0 },
      width: useStore.getState().width,
      height: useStore.getState().height,
      data: {},
      selectable: false,
      draggable: false,
    },
    {
      id: '1',
      type: 'point',
      position: {
        x: useStore.getState().points['1'][0],
        y: useStore.getState().points['1'][1],
      },
      data: {},
    },
    {
      id: '2',
      type: 'point',
      position: {
        x: useStore.getState().points['2'][0],
        y: useStore.getState().points['2'][1],
      },
      data: {},
    },
    {
      id: '3',
      type: 'point',
      position: {
        x: useStore.getState().points['3'][0],
        y: useStore.getState().points['3'][1],
      },
      data: {},
    },
    {
      id: '4',
      type: 'point',
      position: {
        x: useStore.getState().points['4'][0],
        y: useStore.getState().points['4'][1],
      },
      data: {},
    },
  ];
};

const defaultEdges = [
  { id: '1-2', source: '1', target: '2' },
  { id: '2-3', source: '2', target: '3' },
  { id: '3-4', source: '3', target: '4' },
  { id: '4-1', source: '4', target: '1' },
];

export function Image() {
  const hasImage = useStore(useShallow((state) => !!state.base64Image));

  if (!hasImage) {
    return null;
  }

  return (
    <div className={styles['diagram-container']}>
      <ReactFlow
        defaultNodes={getDefaultNodes()}
        defaultEdges={defaultEdges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Lines} />
      </ReactFlow>
    </div>
  );
}
