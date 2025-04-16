import { useContext, useEffect, useRef } from 'react';
import { DiagramContext } from './diagram-context';
import { createDiagram } from '../diagram/create-diagram';
import styles from '../styles.module.scss';
import clsx from 'clsx';

export const Diagram = () => {
  const { setDiagram } = useContext(DiagramContext);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const diagram = createDiagram(divRef.current!);

    if (process.env['NODE_ENV'] !== 'production') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).diagram = diagram;
    }

    setDiagram(diagram);
  }, [setDiagram]);

  return (
    <div className={clsx('diagram', styles.diagramWrapper)}>
      <div className={styles.diagramContainer} ref={divRef} />
    </div>
  );
};
