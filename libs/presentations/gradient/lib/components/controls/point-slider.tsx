import { ChangeEvent, useCallback, useMemo } from 'react';
import { Point } from '../../types';
import styles from '../../styles.module.scss';

type Props<T> = {
  stringToColor: (color: string) => T;
  colorToString: (color: T) => string;
  value: Point<T>;
  setValue: (value: Point<T>) => void;
  deleteCallback: () => void;
  insertCallback: () => void;
  previous: Point<T> | undefined;
  next: Point<T> | undefined;
};

export function PointSlider<T>({
  stringToColor,
  colorToString,
  value,
  setValue,
  deleteCallback,
  insertCallback,
  next,
  previous,
}: Props<T>) {
  const color = useMemo(
    () => colorToString(value.color),
    [value, colorToString]
  );
  const handleColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue({
        ...value,
        color: stringToColor(e.target.value),
      });
    },
    [value, setValue, stringToColor]
  );

  const minValue = useMemo(() => previous?.position || 0, [previous]);
  const maxValue = useMemo(() => next?.position || 1, [next]);
  const sliderValue = value.position;
  const handleSliderValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newPosition = e.target.valueAsNumber;
      if (newPosition >= minValue && newPosition <= maxValue) {
        setValue({
          ...value,
          position: newPosition,
        });
      }
    },
    [value, setValue, minValue, maxValue]
  );

  return (
    <li className={styles['point']}>
      <input type="color" value={color} onChange={handleColorChange} />
      <input
        type="range"
        value={sliderValue}
        onChange={handleSliderValueChange}
        min={0}
        max={1}
        step={0.01}
        className={styles['slider']}
      />
      <input
        type="number"
        value={sliderValue}
        onChange={handleSliderValueChange}
        min={minValue}
        max={maxValue}
        step={0.01}
        className={styles['numberInput']}
      />
      {next ? (
        <button
          className={styles['addButton']}
          onClick={insertCallback}
          aria-label="Dodaj nowy kolor"
        >
          <i className="ph ph-plus-circle"></i>
        </button>
      ) : null}
      {previous && next ? (
        <button
          className={styles['deleteButton']}
          onClick={deleteCallback}
          aria-label="Usuń kolor"
        >
          <i className="ph ph-trash"></i>
        </button>
      ) : null}
    </li>
  );
}
