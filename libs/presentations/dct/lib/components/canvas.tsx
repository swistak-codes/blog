import styles from './canvas.module.scss';
import { useImage } from '../hooks/use-image';
import { BLOCK_SIZE } from '../utils/consts';
import clsx from 'clsx';
import { useStore } from '../hooks/use-store';

interface Props {
  image: number[];
  hoveredBlock: number | null;
  onBlockMouseEnter: (index: number) => () => void;
  onBlockMouseLeave: () => void;
}

export function Canvas({
  image,
  onBlockMouseEnter,
  onBlockMouseLeave,
  hoveredBlock,
}: Props) {
  const { width, height, setDisplayedBlock } = useStore();
  const { dataUrl } = useImage(image, width, height);
  const blockColumns = Math.ceil(width / BLOCK_SIZE);
  const blockRows = Math.ceil(height / BLOCK_SIZE);

  return (
    <div
      className={styles['canvas']}
      style={{
        background: `url('${dataUrl}') no-repeat left top`,
        width: `${width}px`,
        height: `${height}px`,
        gridTemplateColumns: `repeat(${blockColumns}, ${BLOCK_SIZE}px)`,
        gridTemplateRows: `repeat(${blockRows}, ${BLOCK_SIZE}px)`,
      }}
    >
      {new Array(blockColumns * blockRows).fill(0).map((_, i) => (
        <div
          className={clsx({
            [styles['block']]: true,
            [styles['hovered']]: hoveredBlock === i,
          })}
          key={i}
          onClick={() => setDisplayedBlock(i)}
          onMouseLeave={onBlockMouseLeave}
          onMouseEnter={onBlockMouseEnter(i)}
        />
      ))}
    </div>
  );
}
