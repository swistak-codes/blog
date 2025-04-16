import ReactFlow, { Background, BackgroundVariant, Controls } from 'reactflow';
import styles from '../styles.module.scss';
import 'reactflow/dist/style.css';
import { useAppState } from './state-context';
import { nodeTypes } from './nodes';
import { edgeTypes } from './edges';
import { useShapesAutoRegenerate } from '../logic/hooks/use-shapes-auto-regenerate';

export const Canvas = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, isAnimating } =
    useAppState();

  useShapesAutoRegenerate();

  return (
    <div className={styles['canvasContainer']}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        elementsSelectable={!isAnimating}
      >
        <Controls showInteractive={false} />
        <Background variant={BackgroundVariant.Lines} />
      </ReactFlow>
    </div>
  );
};
