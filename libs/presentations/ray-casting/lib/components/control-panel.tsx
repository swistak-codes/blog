import styles from '../ray-casting.module.scss';
import {
  useRayCastingStore,
  RayCastingStore,
} from '../store/ray-casting-store';
import { useShallow } from 'zustand/react/shallow';
import clsx from 'clsx';

const selectControlPanelState = (state: RayCastingStore) =>
  [
    state.isGameStarted,
    state.planeWidth,
    state.rayCount,
    state.dirLength,
    state.fishEyeCorrection,
    state.showPerpDistances,
  ] as const;

export function ControlPanel() {
  const [
    isGameStarted,
    planeWidth,
    rayCount,
    dirLength,
    fishEyeCorrection,
    showPerpDistances,
  ] = useRayCastingStore(useShallow(selectControlPanelState));

  return (
    <div
      className={clsx(styles.controlsPanel, {
        [styles.inactive]: !isGameStarted,
      })}
    >
      <div className={styles.controlsRow}>
        <div className={styles.controlsGroup}>
          <label htmlFor="planeWidthSlider">Szerokość płaszczyzny (FOV):</label>
          <input
            id="planeWidthSlider"
            type="range"
            min={0.2}
            max={1.5}
            step={0.01}
            value={planeWidth}
            onChange={(e) =>
              useRayCastingStore
                .getState()
                .setPlaneWidth(e.target.valueAsNumber)
            }
            className={styles.planeWidthSlider}
          />
          <span className={styles.valueDisplay}>{planeWidth.toFixed(2)}</span>
          <span className={styles.fovDisplay}>
            (
            {((2 * Math.atan(planeWidth / dirLength) * 180) / Math.PI).toFixed(
              0,
            )}
            °)
          </span>
        </div>
        <div className={styles.controlsGroup}>
          <label htmlFor="dirLengthSlider">Długość wektora:</label>
          <input
            id="dirLengthSlider"
            type="range"
            min={0.1}
            max={2}
            step={0.01}
            value={dirLength}
            onChange={(e) =>
              useRayCastingStore.getState().setDirLength(e.target.valueAsNumber)
            }
            className={styles.dirLengthSlider}
          />
          <span className={styles.valueDisplay}>{dirLength.toFixed(2)}</span>
        </div>
        <div className={styles.controlsGroup}>
          <label htmlFor="fishEyeCheckbox">Korekcja rybiego oka:</label>
          <input
            id="fishEyeCheckbox"
            type="checkbox"
            checked={fishEyeCorrection}
            onChange={(e) =>
              useRayCastingStore
                .getState()
                .setFishEyeCorrection(e.target.checked)
            }
            className={styles.checkbox}
          />
        </div>
      </div>
      <div className={styles.controlsRow}>
        <div className={styles.controlsGroup}>
          <label htmlFor="rayCountSlider">Promienie na mapie:</label>
          <input
            id="rayCountSlider"
            type="range"
            min={4}
            max={127}
            step={1}
            value={rayCount}
            onChange={(e) =>
              useRayCastingStore.getState().setRayCount(e.target.valueAsNumber)
            }
            className={styles.rayCountSlider}
          />
          <span className={styles.rayCountDisplay}>{rayCount}</span>
        </div>
        <div className={styles.controlsGroup}>
          <label
            htmlFor="perpDistCheckbox"
            className={`${styles.perpDistanceLabel} ${!fishEyeCorrection ? styles.disabled : ''}`}
          >
            Pokazuj prostopadłe odległości:
          </label>
          <input
            id="perpDistCheckbox"
            type="checkbox"
            checked={showPerpDistances}
            onChange={(e) =>
              useRayCastingStore
                .getState()
                .setShowPerpDistances(e.target.checked)
            }
            disabled={!fishEyeCorrection}
            className={styles.checkbox}
          />
        </div>
        <div className={styles.resetButtonContainer}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={useRayCastingStore.getState().reset}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
