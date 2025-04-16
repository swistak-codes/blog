import { EdgeTypes } from 'reactflow';
import { CONVEX_HULL_EDGE } from '../../utils/consts';
import { ConvexHullEdge } from './convex-hull-edge';

export const edgeTypes: EdgeTypes = {
  [CONVEX_HULL_EDGE]: ConvexHullEdge,
};
