import { AlgorithmGenerator, AlgorithmType, TraversalType } from '../types';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { DiagramContext } from './diagram-context';
import { bfs } from '../logic/bfs';
import { dfs } from '../logic/dfs';
import { Graph } from '../logic/graph';
import { executeWhole } from '../logic/execute-whole';
import { executeAnimated, stopAnimation } from '../logic/execute-animated';
import styles from '../styles.module.scss';

type Props = {
  type: TraversalType;
};

export const Traversal = ({ type }: Props) => {
  const { nodes, edges, selectedNode, diagram } = useContext(DiagramContext);
  const [currentResult, setCurrentResult] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [blockedRewind, setBlockedRewind] = useState(false);
  const [fps, setFps] = useState(30);
  const [isFreshData, setIsFreshData] = useState(true);
  const algorithm = useRef<AlgorithmType>();
  const iterator = useRef<AlgorithmGenerator>();

  const canExecuteIteration =
    nodes.length > 0 && edges.length > 0 && selectedNode;

  const setResult = (result: string[]) => setCurrentResult([...result]);

  const reset = () => {
    setCurrentResult([]);
    setIsAnimating(false);
    setBlockedRewind(false);
    setIsFreshData(true);
    iterator.current = undefined;
  };

  const handleFpsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFps(e.currentTarget.valueAsNumber);
  };

  const startIteration = () => {
    if (!algorithm.current || !diagram || !selectedNode) {
      return;
    }
    iterator.current = algorithm.current(
      new Graph(nodes, edges, diagram),
      selectedNode
    );
    setIsFreshData(false);
  };

  const goToNext = () => {
    if (isFreshData) {
      startIteration();
    }
    if (!iterator.current) {
      return;
    }
    const result = iterator.current.next();
    setResult(result.value);

    if (result.done) {
      setIsFreshData(true);
    }
  };

  const animate = async () => {
    if (isFreshData) {
      startIteration();
    }
    if (!iterator.current) {
      return;
    }
    setIsAnimating(true);

    await executeAnimated(iterator.current, Math.round(10000 / fps), setResult);

    setIsAnimating((isAnimating) => {
      if (isAnimating) {
        setIsFreshData(true);
        return false;
      }
      return isAnimating;
    });
  };

  const stopPlaying = () => {
    stopAnimation();
    setIsAnimating(false);
  };

  const fastForward = () => {
    if (isFreshData) {
      startIteration();
    }
    if (!iterator.current) {
      return;
    }
    executeWhole(iterator.current, setResult);
    setIsFreshData(true);
  };

  useEffect(() => {
    reset();
    switch (type) {
      case 'BFS':
        algorithm.current = bfs;
        break;
      case 'DFS':
        algorithm.current = dfs;
        break;
      default:
        break;
    }
  }, [nodes, edges, selectedNode, type]);

  return (
    <div className={styles.traversalContainer}>
      <div className={styles.controlsContainer}>
        <button
          disabled={!canExecuteIteration || isAnimating}
          onClick={goToNext}
        >
          Następny krok
        </button>
        <div className={styles.speedControl}>
          <label>Prędkość animacji</label>
          <input
            id="fps"
            min={1}
            max={60}
            type="number"
            value={fps}
            onChange={handleFpsChange}
            disabled={!canExecuteIteration || isAnimating}
          />
        </div>
        {!isAnimating ? (
          <button disabled={!canExecuteIteration} onClick={animate}>
            Odtwórz animację
          </button>
        ) : (
          <button disabled={!canExecuteIteration} onClick={stopPlaying}>
            Pauza
          </button>
        )}
        <button
          disabled={blockedRewind || !canExecuteIteration || isAnimating}
          onClick={fastForward}
        >
          Przewiń do końca
        </button>
      </div>
      {currentResult?.length > 0 ? (
        <div>Kolejność odwiedzin: {currentResult.join(', ')}</div>
      ) : (
        ''
      )}
    </div>
  );
};
