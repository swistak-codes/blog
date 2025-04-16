import { useStore } from '../hooks/use-store';
import { useShallow } from 'zustand/react/shallow';
import { InterpolationFunctionEnum } from '../types';
import { ChangeEvent } from 'react';

export function InterpolationSelect() {
  const interpolation = useStore(
    useShallow((state) => state.interpolationFunction),
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as InterpolationFunctionEnum;
    useStore.getState().setInterpolationFunction(value);
  };

  return (
    <select value={interpolation} onChange={handleChange}>
      <option value="nearest">Algorytm najbliższego sąsiada</option>
      <option value="bilinear">Interpolacja dwuliniowa</option>
    </select>
  );
}
