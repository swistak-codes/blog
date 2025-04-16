import styles from './react-full.module.scss';
import { Uploader } from './components/uploader';
import { useTransformation } from './hooks/use-transformation';
import { Image } from './components/image';
import { TransformedImage } from './components/transformed-image';
import { useStore } from './hooks/use-store';
import { useShallow } from 'zustand/react/shallow';
import { getHash } from './logic/get-hash';
import { Matrix } from './components/matrix';
import { InterpolationSelect } from './components/interpolation-select';

const EMPTY_KEY = getHash('');

const ReactFull = () => {
  const key = useStore(useShallow((state) => getHash(state.base64Image || '')));
  useTransformation();

  return (
    <div className={styles['container']}>
      <Uploader />
      <InterpolationSelect />
      <Image key={key} />
      <TransformedImage />
      {key !== EMPTY_KEY && <Matrix />}
    </div>
  );
};

export default ReactFull;
