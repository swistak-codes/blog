import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export function BcdClock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const size = canvas.scrollWidth;
    canvas.width = size;
    canvas.height = 400;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const GRID_SIZE = size / 6;
    const MARGIN = 10;
    const RADIUS = (GRID_SIZE - MARGIN * 2) / 2;
    const ROWS = 4;

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

    const toBcd = (number: number): [boolean[], boolean[]] => {
      const first = Math.trunc(number / 10);
      const second = Math.trunc(number % 10);
      return [toBinary(first), toBinary(second)];
    };

    const drawDiode = (
      column: number,
      row: number,
      color: string,
      isFilled: boolean
    ) => {
      const centerY =
        ((ROWS - row) * GRID_SIZE + (ROWS - row - 1) * GRID_SIZE) / 2;
      const centerX = (column * GRID_SIZE + (column + 1) * GRID_SIZE) / 2;

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

    const drawColumn = (
      column: number,
      diodesCount: number,
      number: boolean[],
      color: string
    ) => {
      for (let i = 0; i < diodesCount; i++) {
        const isFilled = number.length > i && number[i];
        drawDiode(column, i, color, isFilled);
      }
    };

    const drawNumber = (
      startCol: number,
      firstColDiodesCount: number,
      number: [boolean[], boolean[]],
      color: string
    ) => {
      drawColumn(startCol, firstColDiodesCount, number[0], color);
      drawColumn(startCol + 1, ROWS, number[1], color);
    };

    let stop = false;

    const draw = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

      const binaryHours = toBcd(hours);
      const binaryMinutes = toBcd(minutes);
      const binarySeconds = toBcd(seconds);

      clear();

      drawNumber(0, 2, binaryHours, 'green');
      drawNumber(2, 3, binaryMinutes, 'orange');
      drawNumber(4, 3, binarySeconds, 'red');

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
      <canvas className={styles['canvasBcd']} ref={canvasRef}>
        Twoja przeglądarka nie wspiera Canvas
      </canvas>
    </div>
  );
}
