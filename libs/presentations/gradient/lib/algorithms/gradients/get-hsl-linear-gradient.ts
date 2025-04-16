import { lerpHslColor } from './linear/lerp-hsl-color';
import { getLinearGradient } from './gradient-compute/get-linear-gradient';

// funkcja zwracająca kolory stanowiące gradient w przestrzeni HSL
export const getHslLinearGradient = getLinearGradient(lerpHslColor);
