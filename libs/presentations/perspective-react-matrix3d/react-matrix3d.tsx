import styles from './react-matrix3d.module.scss';
import { Uploader } from './components/uploader';
import { useTransformation } from './hooks/use-transformation';
import { Image } from './components/image';
import { TransformedImage } from './components/transformed-image';
import { useStore } from './hooks/use-store';
import { useShallow } from 'zustand/react/shallow';
import { getHash } from './logic/get-hash';
import { Matrix } from './components/matrix';

const ReactMatrix3d = () => {
  const key = useStore(useShallow((state) => getHash(state.base64Image || '')));
  useTransformation();

  return (
    <div className={styles['container']}>
      <Uploader />
      <Image key={key} />
      <TransformedImage />
      {key !== 3338908027751811 && <Matrix />}
    </div>
  );
};

export default ReactMatrix3d;
