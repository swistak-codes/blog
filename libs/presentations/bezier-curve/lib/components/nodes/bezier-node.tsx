import { Handle, Position } from 'reactflow';
import styles from '../../styles.module.scss';

export const BezierNode = () => {
  return (
    <div className={styles['node']}>
      <Handle type="source" position={Position.Left} isConnectable={false} />
      <Handle type="target" position={Position.Right} isConnectable={false} />
    </div>
  );
};
