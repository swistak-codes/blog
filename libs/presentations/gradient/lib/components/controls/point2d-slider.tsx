import { Point2D } from '../../types';
import { ChangeEvent, useCallback } from 'react';
import styles from '../../styles.module.scss';

type Props = {
  point: Point2D;
  setPoint: (point: Point2D) => void;
};

export const Point2DSlider = ({ point, setPoint }: Props) => {
  const handleXChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPoint({
        ...point,
        x: e.target.valueAsNumber,
      });
    },
    [point, setPoint]
  );

  const handleYChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPoint({
        ...point,
        y: e.target.valueAsNumber,
      });
    },
    [point, setPoint]
  );

  return (
    <li className={styles['point']}>
      <label className={styles['label']}>
        X
        <input
          type="range"
          value={point.x}
          onChange={handleXChange}
          min={0}
          max={1}
          step={0.01}
          className={styles['slider2d']}
        />
        <input
          type="number"
          value={point.x}
          onChange={handleXChange}
          min={0}
          max={1}
          step={0.01}
          className={styles['numberInput']}
        />
      </label>
      <label className={styles['label']}>
        Y
        <input
          type="range"
          value={point.y}
          onChange={handleYChange}
          min={0}
          max={1}
          step={0.01}
          className={styles['slider2d']}
        />
        <input
          type="number"
          value={point.y}
          onChange={handleYChange}
          min={0}
          max={1}
          step={0.01}
          className={styles['numberInput']}
        />
      </label>
    </li>
  );
};
