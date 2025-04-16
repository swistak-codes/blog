import { useAppState } from '../../components/state-context';
import { ChangeEvent, useCallback } from 'react';

export const useDrawnPointsInput = () => {
  const { drawnPointsCount, setDrawnPointsCount } = useAppState();

  const handleChangePoints = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setDrawnPointsCount(e.target.valueAsNumber),
    [setDrawnPointsCount]
  );

  return { drawnPointsCount, handleChangePoints };
};
