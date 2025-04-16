import { getBezierGradient } from './gradient-compute/get-bezier-gradient';
import { rgbBezier } from './bezier/rgb-bezier';

// funkcja zwracająca kolory stanowiące gradient w przestrzeni RGB
export const getRgbBezierGradient = getBezierGradient(rgbBezier);
