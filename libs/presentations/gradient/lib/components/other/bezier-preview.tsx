import { Point2D } from '../../types';
import styles from '../../styles.module.scss';

type Props = {
  p1: Point2D;
  p2: Point2D;
};

const SIZE = 100;

export const BezierPreview = ({ p1, p2 }: Props) => {
  return (
    <div className={styles['bezierImage']}>
      <svg viewBox={`0 0 ${SIZE + 5} ${SIZE + 5}`}>
        <g>
          <path
            d={`M 5 ${SIZE} C ${p1.x * SIZE} ${SIZE - p1.y * SIZE}, ${
              p2.x * SIZE
            } ${SIZE - p2.y * SIZE}, ${SIZE} 5`}
          />
        </g>
      </svg>
    </div>
  );
};
