import { useRef, useState } from 'react';
import { MazeCellInfo } from './types';
import { AlgorithmResult } from '../algorithms/types';
import { Algorithms } from '../algorithms/algorithms';
import { Heuristics } from '../algorithms/heuristics';
import { Result } from '../components/result';
import { AlgorithmControls } from '../components/algorithm-controls';
import { generate } from './helpers/generate';
import { MazeControls } from './components/maze-controls';
import { VisualizationSettings } from '../components/visualization-settings';
import { Display } from '../components/display';
import { MazeGraph } from '../algorithms/graph/maze-graph';
import { GraphStats } from '../components/graph-stats';
import { MazeCell } from './components/maze-cell';

const INITIAL_SIZE = 30;
const initialMaze = generate(INITIAL_SIZE);

export const Maze = () => {
  const [maze, setMaze] = useState(initialMaze);
  const [mazeSize, setMazeSize] = useState(INITIAL_SIZE);
  const generatedMazeSize = useRef(INITIAL_SIZE);
  const [selectedPoints, setSelectedPoints] = useState<MazeCellInfo[]>([]);
  const [algorithm, setAlgorithm] = useState(Algorithms.AStar);
  const [heuristic, setHeuristic] = useState(Heuristics.Euclidean);
  const [algorithmResult, setAlgorithmResult] =
    useState<AlgorithmResult<MazeCellInfo> | null>(null);
  const [colorDistance, setColorDistance] = useState(false);
  const [graph, setGraph] = useState<MazeGraph>(new MazeGraph(initialMaze));

  const handleMazeGenerateClick = () => {
    const maze = generate(mazeSize);
    setMaze(maze);
    setSelectedPoints([]);
    setGraph(new MazeGraph(maze));
    generatedMazeSize.current = mazeSize;
  };

  return (
    <div>
      <Display
        maze={maze}
        algorithmResult={algorithmResult}
        setSelectedPoints={setSelectedPoints}
        selectedPoints={selectedPoints}
        colorDistance={colorDistance}
        generatedMazeSize={generatedMazeSize.current}
        CellComponent={MazeCell}
      />
      <GraphStats graph={graph} />
      <MazeControls
        value={mazeSize}
        setMazeSize={setMazeSize}
        onGenerate={handleMazeGenerateClick}
      />
      <AlgorithmControls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        heuristic={heuristic}
        setHeuristic={setHeuristic}
        selectedPoints={selectedPoints}
        setAlgorithmResult={setAlgorithmResult}
        graph={graph}
        showBfs
      />
      {algorithm !== Algorithms.Bfs && (
        <VisualizationSettings
          colorDistance={colorDistance}
          setColorDistance={setColorDistance}
        />
      )}
      {algorithmResult && <Result algorithmResult={algorithmResult} />}
    </div>
  );
};

export default Maze;
