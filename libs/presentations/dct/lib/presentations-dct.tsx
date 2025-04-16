import styles from './presentations-dct.module.scss';
import { useEncoding } from './hooks/use-encoding';
import { Uploader } from './components/uploader';
import { ImageView } from './views/image-view';
import { useStore } from './hooks/use-store';
import { BlockView } from './views/block-view';

export function PresentationsDct() {
  const { displayedBlock } = useStore();
  useEncoding();

  return (
    <div className={styles['container']}>
      <Uploader />
      {displayedBlock == null ? <ImageView /> : <BlockView />}
    </div>
  );
}
