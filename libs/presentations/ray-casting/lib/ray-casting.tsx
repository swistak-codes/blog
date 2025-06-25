import { useEffect, useRef } from 'react';
import styles from './ray-casting.module.scss';
import { resizeCanvases } from './logic/canvas/resize-canvases';
import { Raycaster } from './components/raycaster';
import { GameContainer } from './components/game-container';
import { GamePlaceholder } from './components/game-placeholder';
import { ControlPanel } from './components/control-panel';
import { useRayCastingStore } from './store/ray-casting-store';

export default function RayCasting() {
  const gameCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mapCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isGameStarted = useRayCastingStore((state) => state.isGameStarted);

  useEffect(() => {
    function handleResize() {
      resizeCanvases(
        gameCanvasRef.current,
        mapCanvasRef.current,
        containerRef.current,
      );
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.gameContainer}>
      {!isGameStarted ? (
        <GamePlaceholder
          gameCanvasRef={gameCanvasRef}
          mapCanvasRef={mapCanvasRef}
          containerRef={containerRef}
        />
      ) : (
        <>
          <GameContainer
            gameCanvasRef={gameCanvasRef}
            mapCanvasRef={mapCanvasRef}
            containerRef={containerRef}
            onControlChange={useRayCastingStore.getState().setControl}
          />
          <Raycaster
            gameCanvasRef={gameCanvasRef}
            mapCanvasRef={mapCanvasRef}
          />
        </>
      )}
      <ControlPanel />
    </div>
  );
}
