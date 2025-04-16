import { lerp } from '../linear/lerp';
import { Point2D } from '../../../types';

// funkcja interpolująca t z krzywej Béziera
export function getTFromCurve(curve: Point2D[], t: number) {
  // znajdziemy dwa punkty pomiędzy naszym aktualnym t
  // korzystając z wyszukiwania binarnego (punkty są posortowane po x)
  let left = 0;
  let right = curve.length - 1;
  // szukamy tak długo, aż znajdziemy sąsiadujące ze sobą punkty
  while (right - left > 1) {
    const mid = Math.trunc((left + right) / 2);
    if (curve[mid].x < t) {
      left = mid;
    } else {
      right = mid;
    }
  }
  // wyciągamy punkty, pomiędzy którymi znajduje się t
  const p0 = curve[left];
  const p1 = curve[right];
  // wyliczamy, w jakim miejscu pomiędzy punktami jest t
  const lerpT = (t - p0.x) / (p1.x - p0.x);
  // interpolujemy wartość y
  return lerp(p0.y, p1.y, lerpT);
}
