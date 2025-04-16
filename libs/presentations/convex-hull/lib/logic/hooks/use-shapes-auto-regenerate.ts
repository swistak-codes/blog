import { useAppState } from '../../components/state-context';
import { useEffect, useRef } from 'react';
import { Node } from 'reactflow';
import { getFinalConvexHull } from '../get-final-convex-hull';
import { edgesToNodeSet } from '../mappers/edges-to-node-set';

export const useShapesAutoRegenerate = () => {
  const { nodes, setEdges, setNodesInHull, isAnimating } = useAppState();

  const prevControlNodes = useRef<Set<Node>>(new Set());

  useEffect(() => {
    if (isAnimating) {
      return;
    }
    if (
      prevControlNodes.current.size !== nodes.length ||
      nodes.some((x) => !prevControlNodes.current.has(x))
    ) {
      const convexHull = getFinalConvexHull(nodes);
      setEdges(convexHull);
      setNodesInHull(edgesToNodeSet(convexHull));
      prevControlNodes.current = new Set(nodes);
    }
  }, [nodes, setNodesInHull, setEdges, isAnimating]);
};
