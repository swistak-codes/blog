import { useState } from 'react';
import { ReactFlowProvider, useEdgesState, useNodesState } from 'reactflow';
import { Canvas } from './components/canvas';
import { Controls } from './components/controls';
import { generateInitialNodes } from './logic/generate-initial-nodes';
import { StateContextProvider } from './components/state-context';

export const ConvexHull = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    generateInitialNodes()
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nodesInHull, setNodesInHull] = useState(new Set<string>());

  return (
    <StateContextProvider
      value={{
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        isAnimating,
        setIsAnimating,
        nodesInHull,
        setNodesInHull,
      }}
    >
      <ReactFlowProvider>
        <Canvas />
        <Controls />
      </ReactFlowProvider>
    </StateContextProvider>
  );
};
