import { DistanceHeuristic } from './types';
import { euclidean } from './distance-heuristic/euclidean';
import { manhattan } from './distance-heuristic/manhattan';
import { chebyshev } from './distance-heuristic/chebyshev';
import { constant } from './distance-heuristic/constant';
import { haversine } from './distance-heuristic/haversine';
import { equirectangular } from './distance-heuristic/equirectangular';

export enum Heuristics {
  Constant,
  Euclidean,
  Manhattan,
  Chebyshev,
  Haversine,
  Equirectangular,
}

export const heuristicMap: Record<Heuristics, DistanceHeuristic<never>> = {
  [Heuristics.Constant]: constant,
  [Heuristics.Euclidean]: euclidean,
  [Heuristics.Manhattan]: manhattan,
  [Heuristics.Chebyshev]: chebyshev,
  [Heuristics.Haversine]: haversine,
  [Heuristics.Equirectangular]: equirectangular,
};
