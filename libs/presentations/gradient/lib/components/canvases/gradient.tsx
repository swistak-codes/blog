import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Point } from '../../types';
import styles from '../../styles.module.scss';
import { PointSlider } from '../controls/point-slider';
import { modifyAtIndex } from '../../algorithms/arrays/modify-at-index';
import { removeAtIndex } from '../../algorithms/arrays/remove-at-index';
import { insertAtIndex } from '../../algorithms/arrays/insert-at-index';
import { generateNewPoint } from '../../algorithms/other/generate-new-point';
import { CANVAS_HEIGHT } from '../../consts';

type Props<T> = PropsWithChildren<{
  initialPoints: Point<T>[];
  getGradient: (startColor: T, endColor: T, numColors: number) => T[];
  colorToString: (color: T) => string;
  stringToColor: (color: string) => T;
  getRandomColor: () => T;
}>;

export function Gradient<T>({
  initialPoints,
  getGradient,
  colorToString,
  stringToColor,
  getRandomColor,
  children,
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
    // iterujemy po wszystkich punktach + 1, aby obsłużyć dorysowanie koloru na końcu
    for (let i = 0; i <= points.length; i++) {
      let previous = points[i - 1];
      let current = points[i];

      if (previous == null && current.position > 0) {
        // obsługa uzupełnienia kolorem początku, jeśli jest przesunięty
        previous = { color: current.color, position: 0 };
      } else if (current == null && previous.position < 1) {
        // obsługa uzupełnienia kolorem końca, jeśli jest przesunięty
        current = { color: previous.color, position: 1 };
      }

      // jeśli mamy oba kolory, możemy przejść do rysowania
      if (previous != null && current != null) {
        const width = canvas.width;
        // przekładamy procentową pozycję na piksele
        const previousPos = Math.trunc(previous.position * width);
        const currentPos = Math.trunc(current.position * width);
        // wyliczamy liczbę kolorów do pobrania
        const colorsNumber = currentPos - previousPos + 1;
        // obliczamy kolory przekazanym algorytmem
        const colors = getGradient(previous.color, current.color, colorsNumber);
        // rysujemy po kolei kolory
        for (let i = 0; i < colors.length; i++) {
          const color = colors[i];
          const x = previousPos + i;
          // rysowanie kilkukrotnie ze względu na niezidentyfikowany bug na blogu
          // TODO znaleźć czemu stroke jest półprzezroczysty
          for (let j = 0; j < 5; j++) {
            context.beginPath();
            context.strokeStyle = colorToString(color);
            context.moveTo(x, 0);
            context.lineTo(x, CANVAS_HEIGHT);
            context.stroke();
          }
        }
      }
    }
  }, [points, getGradient, colorToString]);

  return (
    <div className={styles['container']}>
      <canvas className={styles['canvas']} ref={canvasRef}>
        Twoja przeglądarka nie wspiera Canvas
      </canvas>
      {children}
      <ol className={styles['pointList']}>
        {points.map((point, i) => (
          <PointSlider
            stringToColor={stringToColor}
            colorToString={colorToString}
            value={point}
            setValue={(value) => setPoints(modifyAtIndex(value, i))}
            deleteCallback={() => setPoints(removeAtIndex(i))}
            insertCallback={() =>
              setPoints(
                insertAtIndex(generateNewPoint(points, getRandomColor(), i), i)
              )
            }
            previous={points[i - 1]}
            next={points[i + 1]}
            key={i}
          />
        ))}
      </ol>
    </div>
  );
}
