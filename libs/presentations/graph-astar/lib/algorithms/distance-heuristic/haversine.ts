import { DistanceHeuristic, MapPoint } from '../types';
import { degToRad } from '../../helpers/deg-to-rad';

export const haversine: DistanceHeuristic<MapPoint> = (start, end) => {
  const r = 6371000;
  const { lat: lat1, lon: lng1 } = start;
  const { lat: lat2, lon: lng2 } = end;
  const dLat = degToRad(lat2 - lat1);
  const dLng = degToRad(lng2 - lng1);
  const lat1Rad = degToRad(lat1);
  const lat2Rad = degToRad(lat2);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  const c = 2 * Math.asin(Math.sqrt(a));
  return r * c;
};
