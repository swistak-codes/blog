import { useStore } from './use-store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { getPerspectiveTransform } from '../logic/get-perspective-transform';

export function useTransformation() {
  const [base64Image, width, height, points] = useStore(
    useShallow((state) => [
      state.base64Image,
      state.width,
      state.height,
      state.points,
    ]),
  );

  /**
   * Przeliczenie macierzy transformacji na podstawie punktów
   */
  useEffect(() => {
    if (!base64Image) {
      return;
    }
    useStore
      .getState()
      .setTransformationMatrix(
        getPerspectiveTransform(
          [points['1'], points['2'], points['3'], points['4']],
          width,
          height,
        ),
      );
  }, [base64Image, points]);
}
