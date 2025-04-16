import { PropsWithChildren, useCallback, useState } from 'react';
import {
  initialHslPoints,
  initialP1,
  initialP2,
  initialRgbPoints,
} from '../consts';
import { Mode } from '../types';
import styles from '../styles.module.scss';
import { Gradient } from './canvases/gradient';
import { rgbToString } from '../algorithms/colors/rgb/rgb-to-string';
import { stringToRgb } from '../algorithms/colors/rgb/string-to-rgb';
import { getRandomRgb } from '../algorithms/colors/rgb/get-random-rgb';
import { hslToString } from '../algorithms/colors/hsl/hsl-to-string';
import { stringToHsl } from '../algorithms/colors/hsl/string-to-hsl';
import { getRandomHsl } from '../algorithms/colors/hsl/get-random-hsl';
import { getRgbPolynomialGradient } from '../algorithms/gradients/get-rgb-polynomial-gradient';
import { getHslPolynomialGradient } from '../algorithms/gradients/get-hsl-polynomial-gradient';
import { Point2DSlider } from './controls/point2d-slider';
import { BezierPreview } from './other/bezier-preview';
import { ModeSelector } from './other/mode-selector';

export const Polynomial = () => {
  const [mode, setMode] = useState<Mode>('rgb');
  const [p1, setP1] = useState(initialP1);
  const [p2, setP2] = useState(initialP2);

  const GradientComponent = useCallback(
    ({ children }: PropsWithChildren) => {
      return mode === 'rgb' ? (
        <Gradient
          initialPoints={initialRgbPoints}
          getGradient={getRgbPolynomialGradient(p1, p2)}
          colorToString={rgbToString}
          stringToColor={stringToRgb}
          getRandomColor={getRandomRgb}
        >
          {children}
        </Gradient>
      ) : (
        <Gradient
          initialPoints={initialHslPoints}
          getGradient={getHslPolynomialGradient(p1, p2)}
          colorToString={hslToString}
          stringToColor={stringToHsl}
          getRandomColor={getRandomHsl}
        >
          {children}
        </Gradient>
      );
    },
    [mode, p1, p2]
  );

  return (
    <div className={styles['container']}>
      <ModeSelector mode={mode} setMode={setMode} />
      <GradientComponent>
        <div className={styles['bezierContainer']}>
          <ol>
            <Point2DSlider point={p1} setPoint={setP1} />
            <Point2DSlider point={p2} setPoint={setP2} />
          </ol>
          <BezierPreview p1={p1} p2={p2} />
        </div>
      </GradientComponent>
    </div>
  );
};
