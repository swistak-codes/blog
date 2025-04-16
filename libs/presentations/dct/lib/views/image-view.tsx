import { useStore } from '../hooks/use-store';
import { useMemo, useState } from 'react';
import { Canvas } from '../components/canvas';
import { MatrixView } from './matrix-view';

export function ImageView() {
  const { originalImage, encodedImage, estimatedBlockSizes } = useStore();

  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const [isShowingMatrix, setIsShowingMatrix] = useState(false);
  const compressedSize = useMemo(
    () => estimatedBlockSizes.reduce((prev, curr) => prev + curr, 0),
    [estimatedBlockSizes]
  );

  const onBlockMouseEnter = (index: number) => () => setHoveredBlock(index);
  const onBlockMouseLeave = () => setHoveredBlock(null);
  const onMatrixBtnClick = () => setIsShowingMatrix((x) => !x);

  return originalImage.length ? (
    isShowingMatrix ? (
      <MatrixView onClose={onMatrixBtnClick} />
    ) : (
      <>
        <button onClick={onMatrixBtnClick}>Macierz kwantyzacji</button>
        <Canvas
          image={originalImage}
          hoveredBlock={hoveredBlock}
          onBlockMouseEnter={onBlockMouseEnter}
          onBlockMouseLeave={onBlockMouseLeave}
        />
        <Canvas
          image={encodedImage}
          hoveredBlock={hoveredBlock}
          onBlockMouseEnter={onBlockMouseEnter}
          onBlockMouseLeave={onBlockMouseLeave}
        />
        <p>
          Rozmiar niezakodowanej bitmapy:{' '}
          {(originalImage.length / 1024).toFixed(2)}&nbsp;kB
          <br />
          Przybliżony rozmiar po kompresji: {(compressedSize / 1024).toFixed(2)}
          &nbsp;kB
        </p>
      </>
    )
  ) : (
    <p>Skorzystaj z pola wyżej, aby wrzucić obrazek ze swojego urządzenia.</p>
  );
}
