import { useEffect, useRef } from 'react';
import katex from 'katex';

interface Props {
  expression: string;
}

export function Math({ expression }: Props) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) {
      return;
    }
    katex.render(expression, elRef.current, { throwOnError: false });
  }, [expression]);

  return <div ref={elRef} className="math math-display" />;
}
