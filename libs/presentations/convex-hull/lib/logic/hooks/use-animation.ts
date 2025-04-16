import { useAppState } from '../../components/state-context';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { computeConvexHull } from '../compute-convex-hull';
import { executeAnimated, stopAnimation } from '../execute-animated';
import { getFinalConvexHullFromIterator } from '../get-final-convex-hull';
import { edgesToNodeSet } from '../mappers/edges-to-node-set';

export const useAnimation = () => {
  const { isAnimating, setIsAnimating, nodes, setEdges, setNodesInHull } =
    useAppState();
  const [blockedRewind, setBlockedRewind] = useState(false);
  const [fps, setFps] = useState(30);
  const [isFreshData, setIsFreshData] = useState(true);
  const iterator = useRef<ReturnType<typeof computeConvexHull>>();

  const canExecuteIteration = nodes.length > 0;

  const reset = useCallback(() => {
    setIsAnimating(false);
    setBlockedRewind(false);
    setIsFreshData(true);
    iterator.current = undefined;
  }, [setIsAnimating, setBlockedRewind, setIsFreshData, iterator]);

  useEffect(() => {
    reset();
  }, [nodes, reset]);

  const handleFpsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFps(e.currentTarget.valueAsNumber);
    },
    [setFps]
  );

  const startIteration = useCallback(() => {
    iterator.current = computeConvexHull(nodes);
    setIsFreshData(false);
  }, [nodes, iterator, setIsFreshData]);

  const goToNext = useCallback(() => {
    if (isFreshData) {
      startIteration();
    }
    if (!iterator.current) {
      return;
    }
    const result = iterator.current.next();
    setEdges(result.value);
    setNodesInHull(edgesToNodeSet(result.value));

    if (result.done) {
      setIsFreshData(true);
    }
  }, [
    startIteration,
    isFreshData,
    setIsFreshData,
    iterator,
    setEdges,
    setNodesInHull,
  ]);

  const animate = useCallback(async () => {
    if (isFreshData) {
      startIteration();
    }
    if (!iterator.current) {
      return;
    }
    setIsAnimating(true);

    await executeAnimated(
      iterator.current,
      Math.round(10000 / fps),
      (edges) => {
        setEdges(edges);
        setNodesInHull(edgesToNodeSet(edges));
      }
    );

    setIsAnimating((isAnimating) => {
      if (isAnimating) {
        setIsFreshData(true);
        return false;
      }
      return isAnimating;
    });
  }, [
    isFreshData,
    startIteration,
    iterator,
    setEdges,
    setIsAnimating,
    setNodesInHull,
    fps,
  ]);

  const stopPlaying = useCallback(() => {
    stopAnimation();
    setIsAnimating(false);
  }, [setIsAnimating]);

  const fastForward = useCallback(() => {
    if (isFreshData) {
      startIteration();
    }
    if (!iterator.current) {
      return;
    }
    const result = getFinalConvexHullFromIterator(iterator.current);
    setEdges(result);
    setNodesInHull(edgesToNodeSet(result));
    setIsFreshData(true);
  }, [
    isFreshData,
    startIteration,
    iterator,
    setEdges,
    setIsFreshData,
    setNodesInHull,
  ]);

  return {
    isAnimating,
    canExecuteIteration,
    fps,
    blockedRewind,
    handleFpsChange,
    goToNext,
    animate,
    stopPlaying,
    fastForward,
  };
};
