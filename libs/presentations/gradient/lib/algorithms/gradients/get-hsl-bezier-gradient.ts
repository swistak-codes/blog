import { getBezierGradient } from './gradient-compute/get-bezier-gradient';
import { hslBezier } from './bezier/hsl-bezier';

// funkcja zwracająca kolory stanowiące gradient w przestrzeni HSL
export const getHslBezierGradient = getBezierGradient(hslBezier);
