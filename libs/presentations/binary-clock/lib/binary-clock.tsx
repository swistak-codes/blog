import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export function BinaryClock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const size = canvas.scrollWidth;
    canvas.width = size;
    canvas.height = 300;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const GRID_SIZE = size / 6;
    const MARGIN = 10;
    const RADIUS = (GRID_SIZE - MARGIN * 2) / 2;
    const COLUMNS = 6;

    const clear = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const toBinary = (number: number) => {
      const result: boolean[] = [];
      while (number > 0) {
        result.push(number % 2 === 1);
        number = Math.trunc(number / 2);
      }
      return result;
    };

    const drawDiode = (
      column: number,
      row: number,
      color: string,
      isFilled: boolean
    ) => {
      const centerY = (row * GRID_SIZE + (row + 1) * GRID_SIZE) / 2;
      const centerX =
        ((COLUMNS - column) * GRID_SIZE + (COLUMNS - column - 1) * GRID_SIZE) /
        2;

      context.beginPath();
      context.strokeStyle = color;
      context.fillStyle = color;
      context.arc(centerX, centerY, RADIUS, 0, 2 * Math.PI);
      if (isFilled) {
        context.fill();
      } else {
        context.stroke();
      }
    };

    const drawRow = (
      row: number,
      diodesCount: number,
      number: boolean[],
      color: string
    ) => {
      for (let i = 0; i < diodesCount; i++) {
        const isFilled = number.length > i && number[i];
        drawDiode(i, row, color, isFilled);
      }
    };

    let stop = false;

    const draw = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

      const binaryHours = toBinary(hours);
      const binaryMinutes = toBinary(minutes);
      const binarySeconds = toBinary(seconds);

      clear();

      drawRow(0, 5, binaryHours, 'green');
      drawRow(1, 6, binaryMinutes, 'orange');
      drawRow(2, 6, binarySeconds, 'red');

      if (stop) {
        return;
      }
      window.requestAnimationFrame(() => {
        draw();
      });
    };

    draw();

    return () => {
      stop = true;
    };
  }, [canvasRef]);

  return (
    <div className={styles['container']}>
      <canvas className={styles['canvas']} ref={canvasRef}>
        Twoja przeglądarka nie wspiera Canvas
      </canvas>
    </div>
  );
}
