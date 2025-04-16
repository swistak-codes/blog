import { EdgeTypes } from 'reactflow';
import { BEZIER_EDGE, CONVEX_HULL_EDGE } from '../../utils/consts';
import { BezierEdge } from './bezier-edge';
import { ConvexHullEdge } from './convex-hull-edge';

export const edgeTypes: EdgeTypes = {
  [BEZIER_EDGE]: BezierEdge,
  [CONVEX_HULL_EDGE]: ConvexHullEdge,
};
