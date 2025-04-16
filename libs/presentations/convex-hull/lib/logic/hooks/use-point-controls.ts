import { useAppState } from '../../components/state-context';
import { useCallback, useState } from 'react';
import { createPointNode } from '../mappers/create-point-node';
import { generateInitialNodes } from '../generate-initial-nodes';
import { useOnSelectionChange } from 'reactflow';
import { stopAnimation } from '../execute-animated';

export const usePointControls = () => {
  const { setNodes, nodes } = useAppState();

  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodes(nodes.map((x) => x.id));
    },
  });

  const handleAddPoint = useCallback(() => {
    const newPoint = createPointNode();
    setNodes([...nodes, newPoint]);
  }, [nodes, setNodes]);

  const handleRestart = useCallback(() => {
    stopAnimation();
    setNodes(generateInitialNodes());
  }, [setNodes]);

  const handleDelete = useCallback(() => {
    setNodes((nodes) => nodes.filter((x) => !selectedNodes.includes(x.id)));
  }, [selectedNodes, setNodes]);

  const showDeleteButton = selectedNodes.length > 0;

  return { handleAddPoint, handleRestart, handleDelete, showDeleteButton };
};
