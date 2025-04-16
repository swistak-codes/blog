import { MapPoint } from '../algorithms/types';

export type MapNodeInfo = MapPoint & {
  id: string;
  color?: string;
};
