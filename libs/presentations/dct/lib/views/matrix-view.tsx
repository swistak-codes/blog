import { useStore } from '../hooks/use-store';
import { Math } from '../components/math';
import { ChangeEventHandler, useCallback, useMemo } from 'react';
import { array2dToLatex } from '../logic/array-2d-to-latex';
import styles from './matrix-view.module.scss';
import { interpolateMatrix } from '../logic/interpolate-matrix';

interface Props {
  onClose: () => void;
}

export function MatrixView({ onClose }: Props) {
  const { quantizationMatrix, setQuantizationMatrix, quality, setQuality } =
    useStore();

  const latexMatrix = useMemo(
    () => `Q = ${array2dToLatex(quantizationMatrix)}`,
    [quantizationMatrix]
  );

  const onQualityChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const percent = e.target.valueAsNumber;
      setQuality(percent);
      setQuantizationMatrix(interpolateMatrix(percent));
    },
    [setQuality, setQuantizationMatrix]
  );

  return (
    <div className={styles['matrix-view']}>
      <button onClick={onClose} className={styles['back']}>
        &lt; Powrót
      </button>
      <div className={styles['container']}>
        <input
          type="range"
          value={quality}
          onChange={onQualityChange}
          min={1}
          max={100}
          step={1}
          aria-label="Kompresja w procentach"
        />
        <input
          type="number"
          value={quality}
          onChange={onQualityChange}
          min={1}
          max={100}
          step={1}
          className={styles['value-input']}
          aria-label="Kompresja w procentach"
        />
        %
      </div>
      <Math expression={latexMatrix} />
    </div>
  );
}
