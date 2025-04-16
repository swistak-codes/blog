import { Handle, NodeProps, Position } from 'reactflow';
import styles from '../../styles.module.scss';
import clsx from 'clsx';

export const ControlPointNode = ({ data, selected }: NodeProps) => {
  return (
    <div
      className={clsx({
        [styles['controlPointNode']]: true,
        [styles['selected']]: selected,
      })}
    >
      {data.order}
      <Handle type="source" position={Position.Left} isConnectable={false} />
      <Handle type="target" position={Position.Right} isConnectable={false} />
    </div>
  );
};
