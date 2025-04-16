import { useEffect, useRef, useState } from 'react';
import { CANVAS_HEIGHT } from '../../consts';
import styles from '../../styles.module.scss';
import { ColorPicker } from '../controls/color-picker';
import { modifyAtIndex } from '../../algorithms/arrays/modify-at-index';
import { removeAtIndex } from '../../algorithms/arrays/remove-at-index';
import { insertAtIndex } from '../../algorithms/arrays/insert-at-index';

type Props<T> = {
  initialPoints: T[];
  getGradient: (points: T[], numColors: number) => T[];
  colorToString: (color: T) => string;
  stringToColor: (color: string) => T;
  getRandomColor: () => T;
};

export function BezierGradient<T>({
  initialPoints,
  getGradient,
  colorToString,
  stringToColor,
  getRandomColor,
}: Props<T>) {
  const [points, setPoints] = useState(initialPoints);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Inicjalizacja płótna
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = canvas.scrollWidth;
    canvas.height = CANVAS_HEIGHT;
  }, [canvasRef]);

  /**
   * Aktualizacja płótna nowym gradientem
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    context.globalAlpha = 1;
    // czyścimy płótno
    context.clearRect(0, 0, canvas.width, canvas.height);
    // obliczamy kolory przekazanym algorytmem
    const colors = getGradient(points, canvas.width);
    // rysujemy po kolei kolory
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      // rysowanie kilkukrotnie ze względu na niezidentyfikowany bug na blogu
      // TODO znaleźć czemu stroke jest półprzezroczysty
      for (let j = 0; j < 5; j++) {
        context.beginPath();
        context.strokeStyle = colorToString(color);
        context.moveTo(i, 0);
        context.lineTo(i, CANVAS_HEIGHT);
        context.stroke();
      }
    }
  }, [points, getGradient, colorToString]);

  return (
    <div className={styles['container']}>
      <canvas className={styles['canvas']} ref={canvasRef}>
        Twoja przeglądarka nie wspiera Canvas
      </canvas>
      <ol className={styles['pointList']}>
        {points.map((point, i) => (
          <ColorPicker
            stringToColor={stringToColor}
            colorToString={colorToString}
            value={point}
            setValue={(value) => setPoints(modifyAtIndex(value, i))}
            deleteCallback={() => setPoints(removeAtIndex(i))}
            insertCallback={() => setPoints(insertAtIndex(getRandomColor(), i))}
            hasPrevious={!!points[i - 1]}
            hasNext={!!points[i + 1]}
            key={i}
          />
        ))}
      </ol>
    </div>
  );
}
