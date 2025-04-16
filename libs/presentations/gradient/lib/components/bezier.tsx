import { useState } from 'react';
import { Mode } from '../types';
import styles from '../styles.module.scss';
import { ModeSelector } from './other/mode-selector';
import { BezierGradient } from './canvases/bezier-gradient';
import { initialHslColors, initialRgbColors } from '../consts';
import { getRgbBezierGradient } from '../algorithms/gradients/get-rgb-bezier-gradient';
import { getHslBezierGradient } from '../algorithms/gradients/get-hsl-bezier-gradient';
import { rgbToString } from '../algorithms/colors/rgb/rgb-to-string';
import { stringToRgb } from '../algorithms/colors/rgb/string-to-rgb';
import { getRandomRgb } from '../algorithms/colors/rgb/get-random-rgb';
import { hslToString } from '../algorithms/colors/hsl/hsl-to-string';
import { stringToHsl } from '../algorithms/colors/hsl/string-to-hsl';
import { getRandomHsl } from '../algorithms/colors/hsl/get-random-hsl';

export const Bezier = () => {
  const [mode, setMode] = useState<Mode>('rgb');

  return (
    <div className={styles['container']}>
      <ModeSelector mode={mode} setMode={setMode} />
      {mode === 'rgb' && (
        <BezierGradient
          initialPoints={initialRgbColors}
          getGradient={getRgbBezierGradient}
          colorToString={rgbToString}
          stringToColor={stringToRgb}
          getRandomColor={getRandomRgb}
        />
      )}
      {mode === 'hsl' && (
        <BezierGradient
          initialPoints={initialHslColors}
          getGradient={getHslBezierGradient}
          colorToString={hslToString}
          stringToColor={stringToHsl}
          getRandomColor={getRandomHsl}
        />
      )}
    </div>
  );
};
