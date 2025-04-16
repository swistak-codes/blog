import { generate } from './helpers/generate';
import { useRef, useState } from 'react';
import { GridCellInfo } from './types';
import { Algorithms } from '../algorithms/algorithms';
import { Heuristics } from '../algorithms/heuristics';
import { AlgorithmResult } from '../algorithms/types';
import { Grid4Graph } from '../algorithms/graph/grid4-graph';
import { Grid8Graph } from '../algorithms/graph/grid8-graph';
import { GraphStats } from '../components/graph-stats';
import { AlgorithmControls } from '../components/algorithm-controls';
import { VisualizationSettings } from '../components/visualization-settings';
import { Result } from '../components/result';
import { GridMode } from './helpers/grid-mode';
import { GridControls } from './components/grid-controls';
import { Display } from '../components/display';
import { GridCell } from './components/grid-cell';

const INITIAL_SIZE = 30;
const INITIAL_TRAPS = 150;

const initialGrid = generate(INITIAL_SIZE, INITIAL_TRAPS);

export const Grid = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [gridSize, setGridSize] = useState(INITIAL_SIZE);
  const [gridTraps, setGridTraps] = useState(INITIAL_TRAPS);
  const [gridMode, setGridMode] = useState(GridMode.Four);
  const generatedGridSize = useRef(INITIAL_SIZE);
  const [selectedPoints, setSelectedPoints] = useState<GridCellInfo[]>([]);
  const [algorithm, setAlgorithm] = useState(Algorithms.AStar);
  const [heuristic, setHeuristic] = useState(Heuristics.Euclidean);
  const [algorithmResult, setAlgorithmResult] =
    useState<AlgorithmResult<GridCellInfo> | null>(null);
  const [colorDistance, setColorDistance] = useState(false);
  const [graph, setGraph] = useState<Grid4Graph>(new Grid4Graph(initialGrid));

  const handleGridGenerateClick = () => {
    const grid = generate(gridSize, gridTraps);
    setGrid(grid);
    setSelectedPoints([]);
    setGraph(
      gridMode === GridMode.Four ? new Grid4Graph(grid) : new Grid8Graph(grid)
    );
    generatedGridSize.current = gridSize;
  };

  return (
    <div>
      <Display
        maze={grid}
        algorithmResult={algorithmResult}
        setSelectedPoints={setSelectedPoints}
        selectedPoints={selectedPoints}
        colorDistance={colorDistance}
        generatedMazeSize={generatedGridSize.current}
        CellComponent={GridCell}
      />
      <GraphStats graph={graph} />
      <GridControls
        gridSize={gridSize}
        gridTraps={gridTraps}
        gridMode={gridMode}
        setGridSize={setGridSize}
        setGridTraps={setGridTraps}
        setGridMode={setGridMode}
        onGenerate={handleGridGenerateClick}
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

export default Grid;
