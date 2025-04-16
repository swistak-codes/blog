import { useEffect, useMemo, useRef } from 'react';
import katex from 'katex';
import { useStore } from '../hooks/use-store';
import { useShallow } from 'zustand/react/shallow';
import { array2dToLatex } from '../logic/array-2d-to-latex';

export function Matrix() {
  const elRef = useRef<HTMLDivElement>(null);
  const transformationMatrix = useStore(
    useShallow((state) => state.transformationMatrix),
  );

  const expression = useMemo(
    () =>
      array2dToLatex([
        [
          transformationMatrix[0],
          transformationMatrix[1],
          transformationMatrix[2],
        ],
        [
          transformationMatrix[3],
          transformationMatrix[4],
          transformationMatrix[5],
        ],
        [transformationMatrix[6], transformationMatrix[7], 1],
      ]),
    [transformationMatrix],
  );

  useEffect(() => {
    if (!elRef.current) {
      return;
    }
    katex.render(expression, elRef.current, { throwOnError: false });
  }, [expression]);

  return <div ref={elRef} className="math math-display" />;
}
