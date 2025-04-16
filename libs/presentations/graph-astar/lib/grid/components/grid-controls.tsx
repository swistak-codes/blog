import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { GridMode } from '../helpers/grid-mode';
import styles from '../../styles.module.scss';

type Props = {
  gridSize: number;
  gridTraps: number;
  gridMode: GridMode;
  setGridSize: Dispatch<SetStateAction<number>>;
  setGridTraps: Dispatch<SetStateAction<number>>;
  setGridMode: Dispatch<SetStateAction<GridMode>>;
  onGenerate: () => void;
};

const MIN = 2;
const MAX = 100;
const MIN_TRAPS = 0;

export const GridControls = ({
  onGenerate,
  setGridSize,
  gridSize,
  gridTraps,
  setGridTraps,
  setGridMode,
  gridMode,
}: Props) => {
  const onSizeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setGridSize(Math.max(MIN, Math.min(e.target.valueAsNumber, MAX)));

  const onTrapsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setGridTraps(
      Math.max(MIN_TRAPS, Math.min(e.target.valueAsNumber, gridSize ** 2))
    );

  return (
    <div className={styles.controlsContainer}>
      <div>
        Rozmiar:&nbsp;
        <input
          type="number"
          value={gridSize}
          min={2}
          max={50}
          onChange={onSizeChange}
        />
      </div>
      <div>
        Liczba przeszkód:&nbsp;
        <input
          type="number"
          value={gridTraps}
          min={MIN_TRAPS}
          max={gridSize ** 2}
          onChange={onTrapsChange}
        />
      </div>
      <div>
        Kierunki ruchu:&nbsp;
        <select
          value={gridMode}
          onChange={(e) => setGridMode(parseInt(e.target.value))}
        >
          <option value={GridMode.Four}>4</option>
          <option value={GridMode.Eight}>8</option>
        </select>
      </div>
      <button onClick={onGenerate}>Generuj nową</button>
    </div>
  );
};
