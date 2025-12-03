import { useStore } from '../utils/store';
import { useShallow } from 'zustand/react/shallow';
import { useMemo } from 'react';
import { convertArrayToImage } from '../logic/convert-array-to-image';
import styles from './preview.module.scss';

export function Preview() {
  const [image, width, height, background] = useStore(
    useShallow((state) => [
      state.image,
      state.width,
      state.height,
      state.background,
    ]),
  );

  const imageUrl = useMemo(
    () => convertArrayToImage(image, width, height),
    [image, width, height],
  );

  return (
    <div
      style={{
        backgroundColor: imageUrl
          ? `rgb(${background.r}, ${background.g}, ${background.b})`
          : 'transparent',
      }}
      className={styles['preview']}
    >
      {imageUrl && <img src={imageUrl} alt="" width={width} height={height} />}
    </div>
  );
}
