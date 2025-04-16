import { useContext, useEffect, useState } from 'react';
import { DiagramContext } from './diagram-context';
import styles from '../styles.module.scss';
import clsx from 'clsx';

type Props = {
  visibleLayouts: string[];
};

const layoutToName: Record<string, string> = {
  grid: 'Siatka',
  circle: 'Okrąg',
  cose: 'CoSE',
  coseBilkent: 'CoSE-Bilkent',
  cola: 'CoLa',
  avsdf: 'AVSDF',
  dagre: 'Dagre',
  klay: 'Klay',
  fcose: 'FCoSE',
  euler: 'Euler',
  random: 'Losowy',
  breadthfirst: 'Breadthfirst',
};

const baseLayoutConfig = {
  animate: true,
  fit: true,
};

const layoutToConfig: Record<string, Record<string, unknown>> = {
  grid: { ...baseLayoutConfig },
  circle: { ...baseLayoutConfig },
  cose: { ...baseLayoutConfig, animate: 'end' },
  coseBilkent: { ...baseLayoutConfig, animate: 'end' },
  cola: { ...baseLayoutConfig },
  avsdf: { ...baseLayoutConfig, animate: 'end' },
  dagre: {
    ...baseLayoutConfig,
    acyclicer: 'greedy',
    rankDir: 'TB',
  },
  klay: { ...baseLayoutConfig, klay: { direction: 'DOWN' } },
  fcose: { ...baseLayoutConfig },
  euler: { ...baseLayoutConfig, animate: 'end' },
  random: { ...baseLayoutConfig },
  breadthfirst: { ...baseLayoutConfig, directed: true },
};

export const Layout = ({ visibleLayouts }: Props) => {
  const [currentLayout, setCurrentLayout] = useState(visibleLayouts[0]);
  const { changeLayout } = useContext(DiagramContext);

  useEffect(() => {
    changeLayout(currentLayout, layoutToConfig[currentLayout]);
  }, [currentLayout]);

  return (
    <div className={styles.controlsContainer}>
      {visibleLayouts.length > 1 &&
        visibleLayouts.map((layout) => (
          <button
            onClick={() => setCurrentLayout(layout)}
            className={clsx({
              [styles.selectedButton]: currentLayout === layout,
            })}
            key={layout}
          >
            {layoutToName[layout]}
          </button>
        ))}
    </div>
  );
};
