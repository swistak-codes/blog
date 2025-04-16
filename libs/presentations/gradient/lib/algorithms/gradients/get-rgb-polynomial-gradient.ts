import { lerpRgbColor } from './linear/lerp-rgb-color';
import { getPolynomialGradient } from './gradient-compute/get-polynomial-gradient';

// funkcja zwracająca kolory stanowiące gradient w przestrzeni RGB
export const getRgbPolynomialGradient = getPolynomialGradient(lerpRgbColor);
