import { RefObject } from 'react';
import styles from '../ray-casting.module.scss';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';
import { DpadControls } from './dpad-controls';
import { ControlState } from '../types';

interface GameContainerProps {
  gameCanvasRef: RefObject<HTMLCanvasElement | null>;
  mapCanvasRef: RefObject<HTMLCanvasElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  onControlChange: (key: keyof ControlState, value: boolean) => void;
}

export function GameContainer({
  gameCanvasRef,
  mapCanvasRef,
  containerRef,
  onControlChange,
}: GameContainerProps) {
  return (
    <div
      className={styles.aspectWrapper}
      ref={containerRef}
    >
      <div style={{ position: 'relative' }}>
        <canvas
          ref={gameCanvasRef}
          id="gameCanvas"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className={styles.gameCanvas}
        />
        <DpadControls onControlChange={onControlChange} />
      </div>
      <canvas
        ref={mapCanvasRef}
        id="mapCanvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className={styles.mapCanvas}
      />
    </div>
  );
}
