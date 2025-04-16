import { Handle, NodeProps, Position } from 'reactflow';
import styles from '../../styles.module.scss';
import clsx from 'clsx';
import { useAppState } from '../state-context';

export const PointNode = ({ data, selected, id }: NodeProps) => {
  const { nodesInHull } = useAppState();

  return (
    <div
      className={clsx({
        [styles['pointNode']]: true,
        [styles['selected']]: selected,
        [styles['hull']]: nodesInHull.has(id),
      })}
    >
      {data.order}
      <Handle type="source" position={Position.Left} isConnectable={false} />
      <Handle type="target" position={Position.Right} isConnectable={false} />
    </div>
  );
};
