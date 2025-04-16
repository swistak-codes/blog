import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export function PresentationsClock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const color =
      getComputedStyle(document.documentElement).getPropertyValue(
        '--sc--text'
      ) || 'black';
    const size = canvas.scrollWidth;
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const OUTER_RADIUS = size / 2;
    const SECOND_RADIUS = OUTER_RADIUS * 0.8;
    const MINUTE_RADIUS = OUTER_RADIUS * 0.72;
    const HOUR_RADIUS = OUTER_RADIUS * 0.48;
    const MINUTE_MARKER_RADIUS = OUTER_RADIUS - 5;
    const SECOND_MINUTE_MARKER_RADIUS = MINUTE_MARKER_RADIUS - 5;
    const HOUR_MARKER_RADIUS =
      (SECOND_RADIUS + SECOND_MINUTE_MARKER_RADIUS) / 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const getPosition = (angle: number, radius: number) => {
      const x = radius * Math.cos(angle - 0.5 * Math.PI) + centerX;
      const y = radius * Math.sin(angle - 0.5 * Math.PI) + centerY;
      return [x, y];
    };

    const clear = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawBorder = () => {
      context.beginPath();
      context.strokeStyle = color;
      context.arc(centerX, centerY, OUTER_RADIUS, 0, 2 * Math.PI);
      context.stroke();
    };

    const drawFace = () => {
      for (let i = 1; i <= 60; i++) {
        const divisibleBy5 = i % 5 === 0;
        const angle = (2 * Math.PI * i) / 60;
        const radius = divisibleBy5
          ? SECOND_MINUTE_MARKER_RADIUS
          : MINUTE_MARKER_RADIUS;
        const [startX, startY] = getPosition(angle, radius);
        const [endX, endY] = getPosition(angle, OUTER_RADIUS);

        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();

        if (divisibleBy5) {
          const hour = (i / 5).toString();
          const [x, y] = getPosition(angle, HOUR_MARKER_RADIUS);
          context.font = '24px serif';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillStyle = color;
          context.fillText(hour, x, y);
        }
      }
    };

    const drawHand = (angle: number, color: string, radius: number) => {
      const [x, y] = getPosition(angle, radius);
      context.beginPath();
      context.strokeStyle = color;
      context.moveTo(centerX, centerY);
      context.lineTo(x, y);
      context.stroke();
    };

    const drawHoursHand = (hours: number, minutes: number) => {
      const time = hours + minutes / 60;
      const angle = (2 * Math.PI * time) / 12;
      drawHand(angle, color, HOUR_RADIUS);
    };

    const drawMinutesHand = (minutes: number, seconds: number) => {
      const time = minutes + seconds / 60;
      const angle = (2 * Math.PI * time) / 60;
      drawHand(angle, color, MINUTE_RADIUS);
    };

    const drawSecondsHand = (seconds: number, milliseconds: number) => {
      const time = seconds + milliseconds / 1000;
      const angle = (2 * Math.PI * time) / 60;
      drawHand(angle, 'red', SECOND_RADIUS);
    };

    let stop = false;

    const draw = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours() % 12;
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();
      const milliseconds = currentTime.getMilliseconds();

      clear();
      drawBorder();
      drawFace();
      drawHoursHand(hours, minutes);
      drawMinutesHand(minutes, seconds);
      drawSecondsHand(seconds, milliseconds);

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
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}>
        Twoja przeglądarka nie wspiera Canvas
      </canvas>
    </div>
  );
}

export default PresentationsClock;
