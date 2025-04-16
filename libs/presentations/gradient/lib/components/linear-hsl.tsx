import { Gradient } from './canvases/gradient';
import { initialHslPoints } from '../consts';
import { getHslLinearGradient } from '../algorithms/gradients/get-hsl-linear-gradient';
import { hslToString } from '../algorithms/colors/hsl/hsl-to-string';
import { stringToHsl } from '../algorithms/colors/hsl/string-to-hsl';
import { getRandomHsl } from '../algorithms/colors/hsl/get-random-hsl';

export const LinearHsl = () => (
  <Gradient
    initialPoints={initialHslPoints}
    getGradient={getHslLinearGradient}
    colorToString={hslToString}
    stringToColor={stringToHsl}
    getRandomColor={getRandomHsl}
  />
);
