import clsx from 'clsx';
import styles from '../ray-casting.module.scss';
import { ControlState } from '../types';

interface DpadControlsProps {
  onControlChange: (key: keyof ControlState, value: boolean) => void;
}

export function DpadControls({ onControlChange }: DpadControlsProps) {
  return (
    <div className={styles.dpadOverlay}>
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <button
          className={clsx(styles.dpadButton, styles.dpadButtonUp)}
          onMouseDown={() => onControlChange('forward', true)}
          onMouseUp={() => onControlChange('forward', false)}
          onMouseLeave={() => onControlChange('forward', false)}
          onTouchStart={() => onControlChange('forward', true)}
          onTouchEnd={() => onControlChange('forward', false)}
          title="Idź do przodu"
        >
          ↑
        </button>
      </div>
      <div style={{ gridColumn: 1, gridRow: 2 }}>
        <button
          className={clsx(styles.dpadButton, styles.dpadButtonLeft)}
          onMouseDown={() => onControlChange('left', true)}
          onMouseUp={() => onControlChange('left', false)}
          onMouseLeave={() => onControlChange('left', false)}
          onTouchStart={() => onControlChange('left', true)}
          onTouchEnd={() => onControlChange('left', false)}
          title="Obróć w lewo"
        >
          ⟲
        </button>
      </div>
      <div style={{ gridColumn: 3, gridRow: 2 }}>
        <button
          className={clsx(styles.dpadButton, styles.dpadButtonRight)}
          onMouseDown={() => onControlChange('right', true)}
          onMouseUp={() => onControlChange('right', false)}
          onMouseLeave={() => onControlChange('right', false)}
          onTouchStart={() => onControlChange('right', true)}
          onTouchEnd={() => onControlChange('right', false)}
          title="Obróć w prawo"
        >
          ⟳
        </button>
      </div>
      <div style={{ gridColumn: 2, gridRow: 2 }}>
        <button
          className={clsx(styles.dpadButton, styles.dpadButtonDown)}
          onMouseDown={() => onControlChange('back', true)}
          onMouseUp={() => onControlChange('back', false)}
          onMouseLeave={() => onControlChange('back', false)}
          onTouchStart={() => onControlChange('back', true)}
          onTouchEnd={() => onControlChange('back', false)}
          title="Idź do tyłu"
        >
          ↓
        </button>
      </div>
    </div>
  );
}
