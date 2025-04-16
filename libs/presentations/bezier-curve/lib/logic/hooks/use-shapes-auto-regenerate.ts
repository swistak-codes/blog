import { useAppState } from '../../components/state-context';
import { useEffect, useRef } from 'react';
import { Node } from 'reactflow';
import { CONTROL_POINT } from '../../utils/consts';
import { computeBezierCurve } from '../compute-bezier-curve';
import { fixControlPoints } from '../fix-control-points';
import { computeConvexHull } from '../compute-convex-hull';

export const useShapesAutoRegenerate = () => {
  const { nodes, setNodes, setEdges, drawnPointsCount } = useAppState();

  const prevControlNodes = useRef<Set<Node>>(new Set());
  const prevControlPointsCount = useRef(drawnPointsCount);

  useEffect(() => {
    const controlPointNodes = nodes.filter((x) => x.type === CONTROL_POINT);
    if (
      drawnPointsCount !== prevControlPointsCount.current ||
      prevControlNodes.current.size !== controlPointNodes.length ||
      controlPointNodes.some((x) => !prevControlNodes.current.has(x))
    ) {
      const bezier = computeBezierCurve(controlPointNodes, drawnPointsCount);
      const newControlPoints = fixControlPoints(controlPointNodes);
      const convexHull = computeConvexHull(controlPointNodes);
      setNodes([...newControlPoints, ...bezier.nodes]);
      setEdges([...bezier.edges, ...convexHull]);
      prevControlNodes.current = new Set(newControlPoints);
      prevControlPointsCount.current = drawnPointsCount;
    }
  }, [nodes, drawnPointsCount, setNodes, setEdges]);
};
