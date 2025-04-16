import { algorithmMap, Algorithms } from '../algorithms/algorithms';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { heuristicMap, Heuristics } from '../algorithms/heuristics';
import { AlgorithmResult, MapPoint, Point } from '../algorithms/types';
import { Graph } from '../algorithms/graph/graph';
import styles from '../styles.module.scss';

type Props<TNode, TPoint extends Point | MapPoint> = {
  algorithm: Algorithms;
  setAlgorithm: Dispatch<SetStateAction<Algorithms>>;
  heuristic: Heuristics;
  setHeuristic: Dispatch<SetStateAction<Heuristics>>;
  selectedPoints: TNode[];
  setAlgorithmResult: Dispatch<SetStateAction<AlgorithmResult<TNode> | null>>;
  graph: Graph<TNode, TPoint>;
  showBfs?: boolean;
  isMap?: boolean;
};

export const AlgorithmControls = <TNode, TPoint extends Point | MapPoint>({
  algorithm,
  heuristic,
  graph,
  selectedPoints,
  setAlgorithm,
  setAlgorithmResult,
  setHeuristic,
  showBfs = false,
  isMap = false,
}: Props<TNode, TPoint>) => {
  const onAlgorithmChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setAlgorithm(parseInt(e.target.value));
  const onHeuristicChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setHeuristic(parseInt(e.target.value));
  const onFindClick = () =>
    setAlgorithmResult(
      algorithmMap[algorithm](
        graph,
        selectedPoints[0],
        selectedPoints[1],
        heuristicMap[heuristic]
      )
    );

  return (
    <div className={styles.controlsContainer}>
      <div>
        Algorytm:&nbsp;
        <select value={algorithm} onChange={onAlgorithmChange}>
          <option value={Algorithms.AStar}>A*</option>
          {showBfs && <option value={Algorithms.Bfs}>BFS</option>}
          <option value={Algorithms.BellmanFord}>Bellman-Ford</option>
          <option value={Algorithms.Dijkstra}>Dijkstra</option>
          <option value={Algorithms.DijkstraStop}>
            Dijkstra (z przerwaniem)
          </option>
        </select>
      </div>
      {algorithm === Algorithms.AStar && (
        <div>
          Heurystyka:&nbsp;
          <select value={heuristic} onChange={onHeuristicChange}>
            {isMap ? (
              <>
                <option value={Heuristics.Haversine}>Haversine</option>
                <option value={Heuristics.Equirectangular}>
                  „Płaska ziemia”
                </option>{' '}
              </>
            ) : (
              <>
                <option value={Heuristics.Euclidean}>Euklidesowa</option>
                <option value={Heuristics.Manhattan}>Manhattan</option>
                <option value={Heuristics.Chebyshev}>Czebyszew</option>
              </>
            )}
            <option value={Heuristics.Constant}>Stała wartość</option>
          </select>
        </div>
      )}
      <button disabled={selectedPoints.length !== 2} onClick={onFindClick}>
        Wyznacz trasę
      </button>
    </div>
  );
};
