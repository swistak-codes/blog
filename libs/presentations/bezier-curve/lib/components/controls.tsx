import styles from '../styles.module.scss';
import { usePointControls } from '../logic/hooks/use-point-controls';
import { useDrawnPointsInput } from '../logic/hooks/use-drawn-points-input';

export const Controls = () => {
  const { handleAddPoint, handleRestart, handleDelete, showDeleteButton } =
    usePointControls();

  const { drawnPointsCount, handleChangePoints } = useDrawnPointsInput();

  return (
    <div className={styles['controlsContainer']}>
      <button onClick={handleAddPoint}>Dodaj punkt</button>
      <button onClick={handleRestart}>Restart</button>
      {showDeleteButton && <button onClick={handleDelete}>Usuń</button>}
      <label>
        Obliczanych t:{' '}
        <input
          type="number"
          value={drawnPointsCount}
          min={2}
          max={100}
          onChange={handleChangePoints}
        />
      </label>
    </div>
  );
};
