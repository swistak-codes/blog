import { useEffect, useState, useRef, useCallback } from 'react';

export const useDebouncedValue = <T,>(value: T, delay = 250) => {
  const [debounced, setDebounced] = useState<T>(value);
  const latestValue = useRef(value);
  latestValue.current = value;

  useEffect(() => {
    const id = setTimeout(() => setDebounced(latestValue.current), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  const flush = useCallback((val?: T) => {
    setDebounced(val ?? latestValue.current);
  }, []);

  return [debounced, flush] as const;
};
