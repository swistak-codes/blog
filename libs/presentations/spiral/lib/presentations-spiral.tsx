import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

export function PresentationsSpiral() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [a, setA] = useState(5);
  const [b, setB] = useState(0);

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

    const MAX_RADIUS = size / 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const getRadius = (
      parameterA: number,
      parameterB: number,
      angle: number
    ) => {
      return parameterA * angle + parameterB;
    };

    const polarToCartesian = (radius: number, angle: number) => {
      const x = radius * Math.cos(angle) + centerX;
      const y = radius * Math.sin(angle) + centerY;

      return [x, y];
    };

    const ANGLE_INCREMENT = 0.01;
    let lastRadius = 0;
    let currentAngle = 0;
    let lastX = centerX + b;
    let lastY = centerY;

    context.beginPath();
    context.strokeStyle = color;
    while (lastRadius < MAX_RADIUS) {
      context.moveTo(lastX, lastY);
      const newRadius = getRadius(a, b, currentAngle);
      const [newX, newY] = polarToCartesian(newRadius, currentAngle);
      context.lineTo(newX, newY);

      lastRadius = newRadius;
      lastX = newX;
      lastY = newY;
      currentAngle += ANGLE_INCREMENT;
    }
    context.stroke();

    return () => {
      context.clearRect(0, 0, size, size);
    };
  }, [canvasRef, a, b]);

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}>
        Twoja przeglądarka nie wspiera Canvas
      </canvas>
      <div className={styles.inputContainer}>
        <label>
          a ={' '}
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.valueAsNumber)}
            min={0.1}
            max={100}
            step={0.1}
          />
        </label>
        <label>
          b ={' '}
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.valueAsNumber)}
            min={0}
            max={200}
            step={1}
          />
        </label>
      </div>
    </div>
  );
}

export default PresentationsSpiral;
