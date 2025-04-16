import { useStore } from '../hooks/use-store';
import { useShallow } from 'zustand/react/shallow';
import styles from '../react-full.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { createTransformedImage } from '../logic/create-transformed-image';
import {
  nearestNeighbor,
  bilinearInterpolation,
} from '../logic/interpolations';
import { debounce } from 'lodash';

export function TransformedImage() {
  const [image, transformationMatrix, width, height, interpolation] = useStore(
    useShallow((state) => [
      state.base64Image,
      state.transformationMatrix,
      state.width,
      state.height,
      state.interpolationFunction,
    ]),
  );

  const [transformedImage, setTransformedImage] = useState('');

  const debouncedCreate = useCallback(
    debounce(async (...args: Parameters<typeof createTransformedImage>) => {
      const result = await createTransformedImage(...args);
      setTransformedImage(result);
    }, 250),
    [],
  );

  useEffect(() => {
    if (!image) {
      return;
    }
    const interpolate =
      interpolation === 'nearest' ? nearestNeighbor : bilinearInterpolation;
    debouncedCreate(image, transformationMatrix, width, height, interpolate);
  }, [
    image,
    transformationMatrix,
    width,
    height,
    interpolation,
    debouncedCreate,
  ]);

  const aspectRatio = width / height;

  if (!image) {
    return null;
  }

  return (
    <div className={styles['image-container']} style={{ aspectRatio }}>
      <img src={transformedImage} alt="" />
    </div>
  );
}
