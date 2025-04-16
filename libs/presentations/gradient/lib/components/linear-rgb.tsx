import { Gradient } from './canvases/gradient';
import { initialRgbPoints } from '../consts';
import { getRgbLinearGradient } from '../algorithms/gradients/get-rgb-linear-gradient';
import { rgbToString } from '../algorithms/colors/rgb/rgb-to-string';
import { stringToRgb } from '../algorithms/colors/rgb/string-to-rgb';
import { getRandomRgb } from '../algorithms/colors/rgb/get-random-rgb';

export const LinearRgb = () => (
  <Gradient
    initialPoints={initialRgbPoints}
    getGradient={getRgbLinearGradient}
    colorToString={rgbToString}
    stringToColor={stringToRgb}
    getRandomColor={getRandomRgb}
  />
);
