import { RefObject, useState } from 'react';
import clsx from 'clsx';
import styles from '../ray-casting.module.scss';
import { useRayCastingStore } from '../store/ray-casting-store';

interface GamePlaceholderProps {
  gameCanvasRef: RefObject<HTMLCanvasElement | null>;
  mapCanvasRef: RefObject<HTMLCanvasElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function GamePlaceholder({
  gameCanvasRef,
  mapCanvasRef,
  containerRef,
}: GamePlaceholderProps) {
  const startGame = useRayCastingStore((state) => state.startGame);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePlayClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      startGame();
    }, 400);
  };

  return (
    <div className={styles.aspectWrapper} ref={containerRef}>
      <div
        className={clsx(styles.placeholderWrapper, {
          [styles.placeholderWrapperAnimating]: isAnimating
        })}
        onClick={handlePlayClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePlayClick();
          }
        }}
        aria-label="Rozpocznij prezentację ray casting"
      >
        <div className={styles.placeholderContainer}>
          <div className={styles.placeholderImage}>
            <img
              src="https://anesthetize.swistak.codes/other/wolf3d_canvas1.png"
              alt="Podgląd ekranu gry"
              className={styles.placeholderImg}
            />
          </div>
        </div>
        <div className={styles.placeholderContainer}>
          <div className={styles.placeholderImage}>
            <img
              src="https://anesthetize.swistak.codes/other/wolf3d_canvas2.png"
              alt="Podgląd mapy gry"
              className={styles.placeholderImg}
            />
          </div>
        </div>
        <div className={clsx(styles.playButton, {
          [styles.playButtonAnimating]: isAnimating
        })}>
          <div className={styles.playIcon}>▶</div>
        </div>
      </div>
      <canvas
        ref={gameCanvasRef}
        style={{ display: 'none' }}
      />
      <canvas
        ref={mapCanvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
}
