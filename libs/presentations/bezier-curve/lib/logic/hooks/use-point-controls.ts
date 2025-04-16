import { useAppState } from '../../components/state-context';
import { useCallback, useState } from 'react';
import { maxBy, partition } from 'lodash';
import { CONTROL_POINT } from '../../utils/consts';
import { createControlPointNode } from '../mappers/create-control-point-node';
import { generateInitialNodes } from '../generate-initial-nodes';
import { useOnSelectionChange } from 'reactflow';

export const usePointControls = () => {
  const { setNodes, nodes } = useAppState();

  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodes(nodes.map((x) => x.id));
    },
  });

  const handleAddPoint = useCallback(() => {
    const [controlPoints, rest] = partition(
      nodes,
      (x) => x.type === CONTROL_POINT
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lastPoint = maxBy(controlPoints, (x) => x.data.order)!;
    const controlPointsWithoutLast = controlPoints.filter(
      (x) => x !== lastPoint
    );
    const newPoint = createControlPointNode();
    newPoint.data.order = lastPoint.data.order;
    const newLastPoint = {
      ...lastPoint,
      data: {
        order: lastPoint.data.order + 1,
      },
    };
    setNodes([...controlPointsWithoutLast, newPoint, newLastPoint, ...rest]);
  }, [nodes, setNodes]);

  const handleRestart = useCallback(() => {
    setNodes(generateInitialNodes());
  }, [setNodes]);

  const handleDelete = useCallback(() => {
    setNodes((nodes) => nodes.filter((x) => !selectedNodes.includes(x.id)));
  }, [selectedNodes, setNodes]);

  const showDeleteButton = selectedNodes.length > 0;

  return { handleAddPoint, handleRestart, handleDelete, showDeleteButton };
};
