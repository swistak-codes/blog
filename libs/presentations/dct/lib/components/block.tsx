import styles from './block.module.scss';
import { useMemo } from 'react';
import clsx from 'clsx';
import { getTextColor } from '../logic/get-text-color';
import { useStore } from '../hooks/use-store';

interface Props {
  colorValues: number[][];
  displayValues: number[][];
}

export function Block({ colorValues, displayValues }: Props) {
  const { showGrid, showValues } = useStore();

  const flatColors = useMemo(() => colorValues.flat(), [colorValues]);
  const flatValues = useMemo(() => displayValues.flat(), [displayValues]);

  return (
    <div className={styles['block']}>
      {flatColors.map((value, i) => (
        <div
          className={clsx({
            [styles['pixel']]: true,
            [styles['with-border']]: showGrid,
          })}
          style={{
            backgroundColor: `rgb(${value}, ${value}, ${value})`,
          }}
          key={i}
        >
          {showValues && (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 120 50"
              preserveAspectRatio="xMinYMid meet"
            >
              <text
                x="60"
                y="40"
                fontSize="50"
                fill={getTextColor(value)}
                textAnchor="middle"
              >
                {flatValues[i]}
              </text>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
