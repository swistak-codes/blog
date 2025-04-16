import { Dispatch, SetStateAction } from 'react';
import styles from '../styles.module.scss';

type Props = {
  colorDistance: boolean;
  setColorDistance: Dispatch<SetStateAction<boolean>>;
};

export const VisualizationSettings = ({
  colorDistance,
  setColorDistance,
}: Props) => (
  <div className={styles.controlsContainer}>
    <div>
      <input
        type={'checkbox'}
        id="color"
        checked={colorDistance}
        onChange={(e) => setColorDistance(e.target.checked)}
      />
      <label htmlFor="color">&nbsp;Wizualizuj obliczone odległości</label>
    </div>
  </div>
);
