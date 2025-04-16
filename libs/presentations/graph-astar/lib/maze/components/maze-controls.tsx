import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from '../../styles.module.scss';

type Props = {
  value: number;
  setMazeSize: Dispatch<SetStateAction<number>>;
  onGenerate: () => void;
};

const MIN = 2;
const MAX = 100;

export const MazeControls = ({ onGenerate, setMazeSize, value }: Props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMazeSize(Math.max(MIN, Math.min(e.target.valueAsNumber, MAX)));
  return (
    <div className={styles.controlsContainer}>
      <div>
        Rozmiar:&nbsp;
        <input
          type="number"
          value={value}
          min={2}
          max={50}
          onChange={onChange}
        />
      </div>
      <button onClick={onGenerate}>Generuj nowy</button>
    </div>
  );
};
