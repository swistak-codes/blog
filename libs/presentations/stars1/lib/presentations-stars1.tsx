import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

interface XY {
  x: number;
  y: number;
}

export function PresentationsStars1() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [n, setN] = useState(8);
  const [x, setX] = useState(3);

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

    function getVertices(count: number) {
      const result: XY[] = [];
      for (let i = 0; i < count; i++) {
        const angle = ((Math.PI * 2) / count) * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        result.push({ x, y });
      }
      return result;
    }

    const visited = new Set();

    function connectVertices(startIndex: number, vertices: XY[], step: number) {
      context!.moveTo(vertices[startIndex].x, vertices[startIndex].y);
      let current = startIndex;
      do {
        current = (current + step) % vertices.length;
        context!.lineTo(vertices[current].x, vertices[current].y);
        visited.add(current);
      } while (current !== startIndex);
    }

    function drawStar(verticesCount: number, step: number) {
      const vertices = getVertices(verticesCount);
      visited.clear();
      context!.beginPath();
      for (let i = 0; i < verticesCount / 2; i++) {
        if (visited.has(i)) {
          continue;
        }
        connectVertices(i, vertices, step);
      }
      context!.closePath();
      context!.strokeStyle = color;
      context!.stroke();
    }

    drawStar(n, x);

    return () => {
      context.clearRect(0, 0, size, size);
    };
  }, [canvasRef, n, x]);

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
          x ={' '}
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.valueAsNumber)}
            min={1}
            max={n - 1}
            step={1}
          />
        </label>
      </div>
    </div>
  );
}

export default PresentationsStars1;
