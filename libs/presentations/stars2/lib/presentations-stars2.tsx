import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

interface XY {
  x: number;
  y: number;
}

export function PresentationsStars2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [n, setN] = useState(8);
  const [ratio, setRatio] = useState(0.5);

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

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    function getVertices(count: number, radius: number, shift: number) {
      const result: XY[] = [];
      for (let i = 0; i < count; i++) {
        const angle = ((Math.PI * 2) / count) * i - Math.PI / 2 + shift;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        result.push({ x, y });
      }
      return result;
    }

    function drawStar(verticesCount: number, ratio: number) {
      const vertices = getVertices(verticesCount, radius, 0);
      const shift = Math.PI / verticesCount;
      const innerRadius = radius * ratio;
      const verticesInner = getVertices(verticesCount, innerRadius, shift);
      context!.beginPath();
      context!.moveTo(verticesInner.at(-1)!.x, verticesInner.at(-1)!.y);
      for (let i = 0; i < verticesCount; i++) {
        context!.lineTo(vertices[i].x, vertices[i].y);
        context!.lineTo(verticesInner[i].x, verticesInner[i].y);
      }
      context!.closePath();
      context!.strokeStyle = color;
      context!.stroke();
    }

    drawStar(n, ratio);

    return () => {
      context.clearRect(0, 0, size, size);
    };
  }, [canvasRef, n, ratio]);

  return (
    <div className={styles['container']}>
      <canvas className={styles['canvas']} ref={canvasRef}>
        Twoja przeglądarka nie wspiera Canvas
      </canvas>
      <div className={styles['inputContainer']}>
        <label>
          n ={' '}
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.valueAsNumber)}
            min={3}
            max={100}
            step={1}
          />
        </label>
        <label>
          Stosunek promienia wewnętrznego do zewnętrznego{' '}
          <input
            type="number"
            value={ratio}
            onChange={(e) => setRatio(e.target.valueAsNumber)}
            min={0}
            max={1}
            step={0.01}
          />
        </label>
      </div>
    </div>
  );
}

export default PresentationsStars2;
