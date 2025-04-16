import { MapNodeInfo } from './types';
import { useState } from 'react';
import { Algorithms } from '../algorithms/algorithms';
import { Heuristics } from '../algorithms/heuristics';
import { AlgorithmResult } from '../algorithms/types';
import { MapGraph } from '../algorithms/graph/map-graph';
import mapData from './wroclaw.json';
import { GraphStats } from '../components/graph-stats';
import { AlgorithmControls } from '../components/algorithm-controls';
import { VisualizationSettings } from '../components/visualization-settings';
import { Result } from '../components/result';
import { MapDisplay } from './components/map-display';

const graph = new MapGraph(mapData.nodes, mapData.edges, mapData.weights);

export const Map = () => {
  const [selectedPoints, setSelectedPoints] = useState<MapNodeInfo[]>([]);
  const [algorithm, setAlgorithm] = useState(Algorithms.AStar);
  const [heuristic, setHeuristic] = useState(Heuristics.Haversine);
  const [algorithmResult, setAlgorithmResult] =
    useState<AlgorithmResult<MapNodeInfo> | null>(null);
  const [colorDistance, setColorDistance] = useState(false);

  return (
    <div>
      <MapDisplay
        colorDistance={colorDistance}
        selectedPoints={selectedPoints}
        setSelectedPoints={setSelectedPoints}
        algorithmResult={algorithmResult}
        graph={graph}
      />
      <GraphStats graph={graph} />
      <AlgorithmControls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        heuristic={heuristic}
        setHeuristic={setHeuristic}
        selectedPoints={selectedPoints}
        setAlgorithmResult={setAlgorithmResult}
        graph={graph}
        isMap
      />
      <VisualizationSettings
        colorDistance={colorDistance}
        setColorDistance={setColorDistance}
      />
      {algorithmResult && <Result algorithmResult={algorithmResult} isMap />}
    </div>
  );
};

export default Map;
