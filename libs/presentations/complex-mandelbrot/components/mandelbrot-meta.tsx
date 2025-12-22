import styles from './mandelbrot-meta.module.scss';
import { Viewport } from '../utils/types';

interface Props {
  viewport: Viewport;
  rendering: Viewport;
  computing: boolean;
}

export const Meta = ({ viewport, rendering, computing }: Props) => {
  return (
    <div className={styles['meta']}>
      <div>
        środek: {viewport.x.toFixed(4)}, {viewport.y.toFixed(4)}
      </div>
      <div>skala: {viewport.scale.toFixed(4)}</div>
      {computing && (
        <div className={styles['meta-sub']}>
          renderowanie: {rendering.x.toFixed(4)}, {rendering.y.toFixed(4)} •{' '}
          {rendering.scale.toFixed(4)}
        </div>
      )}
    </div>
  );
};
