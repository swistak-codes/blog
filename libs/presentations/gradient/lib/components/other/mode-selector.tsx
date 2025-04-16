import { Mode } from '../../types';
import styles from '../../styles.module.scss';
import clsx from 'clsx';

type Props = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export const ModeSelector = ({ mode, setMode }: Props) => (
  <div className={styles['controlsContainer']}>
    <button
      onClick={() => setMode('rgb')}
      className={clsx({
        [styles['selectedButton']]: mode === 'rgb',
      })}
    >
      RGB
    </button>
    <button
      onClick={() => setMode('hsl')}
      className={clsx({
        [styles['selectedButton']]: mode === 'hsl',
      })}
    >
      HSL
    </button>
  </div>
);
