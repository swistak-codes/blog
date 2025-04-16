import { ChangeEvent, useCallback, useMemo } from 'react';
import styles from '../../styles.module.scss';

type Props<T> = {
  stringToColor: (color: string) => T;
  colorToString: (color: T) => string;
  value: T;
  setValue: (value: T) => void;
  deleteCallback: () => void;
  insertCallback: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
};

export function ColorPicker<T>({
  stringToColor,
  colorToString,
  value,
  setValue,
  deleteCallback,
  insertCallback,
  hasPrevious,
  hasNext,
}: Props<T>) {
  const color = useMemo(() => colorToString(value), [value, colorToString]);
  const handleColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(stringToColor(e.target.value));
    },
    [stringToColor, setValue]
  );

  return (
    <li className={styles['point']}>
      <input type="color" value={color} onChange={handleColorChange} />
      {hasNext ? (
        <button
          className={styles['addButton']}
          onClick={insertCallback}
          aria-label="Dodaj nowy kolor"
        >
          <i className="ph ph-plus-circle"></i>
        </button>
      ) : null}
      {hasPrevious && hasNext ? (
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
