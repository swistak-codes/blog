import { NodeProps } from '@xyflow/react';
import { memo, useEffect } from 'react';
import styles from '../react-matrix3d.module.scss';
import { useStore } from '../hooks/use-store';

function PointNodeComponent({
  id,
  positionAbsoluteX,
  positionAbsoluteY,
}: NodeProps) {
  /**
   * Aktualizacja położenia punktu na przesunięciu
   */
  useEffect(() => {
    useStore.getState().setPoint(id, [positionAbsoluteX, positionAbsoluteY]);
  }, [positionAbsoluteX, positionAbsoluteY]);

  return <div className={styles['point-node']}>{id}</div>;
}

export const PointNode = memo(PointNodeComponent);
