import styles from './mandelbrot-controls.module.scss';
import { MIN_ITER, MAX_ITER, ITER_STEP } from '../utils/consts';

interface Props {
  maxIter: number;
  setMaxIter: (v: number) => void;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
}

export const Controls = ({
  maxIter,
  setMaxIter,
  onReset,
  onZoomIn,
  onZoomOut,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
}: Props) => {
  return (
    <div className={styles['controls']}>
      <div className={styles['group']}>
        <label htmlFor="iterations-range">Liczba iteracji</label>
        <input
          type="range"
          id="iterations-range"
          min={MIN_ITER}
          max={MAX_ITER}
          step={ITER_STEP}
          value={maxIter}
          onChange={(e) => setMaxIter(e.target.valueAsNumber)}
        />
        <input
          className={styles['number']}
          type="number"
          min={MIN_ITER}
          max={MAX_ITER}
          step={ITER_STEP}
          value={maxIter}
          onChange={(e) => setMaxIter(e.target.valueAsNumber)}
          aria-label="Liczba iteracji"
        />
      </div>
      <div className={styles['group']}>
        <div className={styles['nudge-group']}>
          <button onClick={onMoveUp} aria-label="w górę">
            ↑
          </button>
          <button onClick={onMoveLeft} aria-label="w lewo">
            ←
          </button>
          <button onClick={onMoveRight} aria-label="w prawo">
            →
          </button>
          <button onClick={onMoveDown} aria-label="w dół">
            ↓
          </button>
        </div>
        <button onClick={onZoomOut} aria-label="oddal">
          −
        </button>
        <button onClick={onZoomIn} aria-label="przybliż">
          +
        </button>
        <button onClick={onReset}>Resetuj</button>
      </div>
    </div>
  );
};
