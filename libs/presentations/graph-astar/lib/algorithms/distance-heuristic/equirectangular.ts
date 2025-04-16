import { DistanceHeuristic, MapPoint } from '../types';
import { degToRad } from '../../helpers/deg-to-rad';

export const equirectangular: DistanceHeuristic<MapPoint> = (start, end) => {
  const r = 6371000;
  const { lat: lat1, lon: lng1 } = start;
  const { lat: lat2, lon: lng2 } = end;
  const dLat = degToRad(lat2 - lat1);
  const dLng = degToRad(lng2 - lng1);
  const x = dLng * Math.cos((lat1 + lat2) / 2);
  const y = dLat;
  return Math.sqrt(x ** 2 + y ** 2) * r;
};
