import { lerpHslColor } from './linear/lerp-hsl-color';
import { getPolynomialGradient } from './gradient-compute/get-polynomial-gradient';

// funkcja zwracająca kolory stanowiące gradient w przestrzeni HSL
export const getHslPolynomialGradient = getPolynomialGradient(lerpHslColor);
