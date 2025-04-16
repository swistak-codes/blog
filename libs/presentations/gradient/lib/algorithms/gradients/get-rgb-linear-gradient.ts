import { lerpRgbColor } from './linear/lerp-rgb-color';
import { getLinearGradient } from './gradient-compute/get-linear-gradient';

// funkcja zwracająca kolory stanowiące gradient w przestrzeni RGB
export const getRgbLinearGradient = getLinearGradient(lerpRgbColor);
