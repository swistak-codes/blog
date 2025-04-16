import { useContext, useEffect, useRef } from 'react';
import { DiagramContext } from './diagram-context';
import { createDiagram } from '../diagram/create-diagram';
import styles from '../styles.module.scss';
import clsx from 'clsx';

export const Diagram = () => {
  const { setDiagram, setEdgeHandles } = useContext(DiagramContext);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { diagram, edgeHandles } = createDiagram(divRef.current!);

    if (process.env['NODE_ENV'] !== 'production') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).diagram = diagram;
    }

    setDiagram(diagram);
    setEdgeHandles(edgeHandles);
  }, [setDiagram, setEdgeHandles]);

  return (
    <div className={clsx('diagram', styles.diagramWrapper)}>
      <div className={styles.diagramContainer} ref={divRef} />
    </div>
  );
};
