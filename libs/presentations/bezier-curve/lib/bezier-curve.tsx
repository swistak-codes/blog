import { useState } from 'react';
import { ReactFlowProvider, useEdgesState, useNodesState } from 'reactflow';
import { Canvas } from './components/canvas';
import { Controls } from './components/controls';
import { generateInitialNodes } from './logic/generate-initial-nodes';
import { StateContextProvider } from './components/state-context';

export const BezierCurve = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    generateInitialNodes()
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [drawnPointsCount, setDrawnPointsCount] = useState(50);

  return (
    <StateContextProvider
      value={{
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        drawnPointsCount,
        setDrawnPointsCount,
      }}
    >
      <ReactFlowProvider>
        <Canvas />
        <Controls />
      </ReactFlowProvider>
    </StateContextProvider>
  );
};
