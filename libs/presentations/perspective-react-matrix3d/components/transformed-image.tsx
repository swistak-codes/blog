import { useStore } from '../hooks/use-store';
import { useShallow } from 'zustand/react/shallow';
import styles from '../react-matrix3d.module.scss';

export function TransformedImage() {
  const [image, [a, b, c, d, e, f, g, h], width, height] = useStore(
    useShallow((state) => [
      state.base64Image,
      state.transformationMatrix,
      state.width,
      state.height,
    ]),
  );

  const aspectRatio = width / height;

  if (!image) {
    return null;
  }

  return (
    <div className={styles['image-container']} style={{ aspectRatio }}>
      <img
        src={image}
        alt=""
        style={{
          transform: `matrix3d(${a}, ${d}, 0, ${g}, ${b}, ${e}, 0, ${h}, 0, 0, 1, 0, ${c}, ${f}, 0, 1)`,
        }}
      />
    </div>
  );
}
