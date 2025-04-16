import { useStore } from '../hooks/use-store';
import styles from './block-view.module.scss';
import { Block } from '../components/block';
import clsx from 'clsx';
import { BlockControls } from '../components/block-controls';
import { Math } from '../components/math';
import { array2dToLatex } from '../logic/array-2d-to-latex';

export function BlockView() {
  const {
    blocks,
    displayedBlock,
    setDisplayedBlock,
    showNormalized,
    estimatedBlockSizes,
  } = useStore();

  if (displayedBlock == null || blocks.length === 0) {
    return null;
  }

  const currentBlock = blocks[displayedBlock];
  const onBackClick = () => setDisplayedBlock(null);

  const latexTransformed = `G = ${array2dToLatex(currentBlock.transformed)}`;
  const latexQuantized = `B = ${array2dToLatex(currentBlock.quantized)}`;
  const latexUnquantized = `G = ${array2dToLatex(currentBlock.unquantized)}`;

  return (
    <div className={styles['block-view']}>
      <button onClick={onBackClick} className={styles['back']}>
        &lt; Powrót
      </button>
      <div className={clsx(styles['container'], styles['center'])}>
        <BlockControls />
      </div>
      <div className={styles['container']}>
        <div className={styles['full-size']}>
          <p>Oryginał</p>
        </div>
        <div className={styles['full-size']}>
          <p>Zakodowany</p>
        </div>
      </div>
      <div className={styles['container']}>
        <Block
          colorValues={currentBlock.originalBlock}
          displayValues={
            showNormalized
              ? currentBlock.normalized
              : currentBlock.originalBlock
          }
        />
        <Block
          colorValues={currentBlock.denormalized}
          displayValues={
            showNormalized
              ? currentBlock.untransformed
              : currentBlock.denormalized
          }
        />
      </div>
      <p>Kodowanie:</p>
      <div className={styles['container']}>
        <Math expression={latexTransformed} />
      </div>
      <div className={styles['container']}>
        <Math expression={latexQuantized} />
      </div>
      <p>Rozmiar bloku przed kompresją: 64&nbsp;B</p>
      <p>
        Przybliżony rozmiar po kompresji: {estimatedBlockSizes[displayedBlock]}
        &nbsp;B
      </p>
      <p>Dekodowanie:</p>
      <div className={styles['container']}>
        <Math expression={latexUnquantized} />
      </div>
    </div>
  );
}
