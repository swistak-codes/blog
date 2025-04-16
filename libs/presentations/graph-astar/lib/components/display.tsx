/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dispatch, SetStateAction, useMemo } from 'react';
import { AlgorithmResult } from '../algorithms/types';
import { BaseCell, CellProps } from '../helpers/types';
import styles from '../styles.module.scss';

type Props<TCellInfo extends BaseCell> = {
  maze: TCellInfo[][];
  generatedMazeSize: number;
  selectedPoints: TCellInfo[];
  algorithmResult: AlgorithmResult<TCellInfo> | null;
  setSelectedPoints: Dispatch<SetStateAction<TCellInfo[]>>;
  colorDistance: boolean;
  CellComponent: (props: CellProps<TCellInfo>) => JSX.Element;
};

export const Display = <TCellInfo extends BaseCell>({
  maze,
  generatedMazeSize,
  selectedPoints,
  algorithmResult,
  setSelectedPoints,
  colorDistance,
  CellComponent,
}: Props<TCellInfo>) => {
  const selectPoint = (point: TCellInfo) => () => {
    setSelectedPoints((points) => {
      return [
        ...new Set(points.length > 1 ? [points[1], point] : [...points, point]),
      ];
    });
  };

  const maxDistance = useMemo(
    () =>
      colorDistance && algorithmResult?.distances != null
        ? [...algorithmResult.distances.values()].reduce((prev, curr) =>
            curr > prev || prev === Number.POSITIVE_INFINITY ? curr : prev
          )
        : null,
    [algorithmResult, colorDistance]
  );

  const realDistance = useMemo(
    () => algorithmResult?.distance,
    [algorithmResult]
  );

  return (
    <div
      className={styles.displayContainer}
      style={{
        gridTemplateRows: `repeat(${generatedMazeSize}, 1fr)`,
        gridTemplateColumns: `repeat(${generatedMazeSize}, 1fr)`,
      }}
    >
      {maze.map((row) =>
        row.map((cell: TCellInfo) => (
          <CellComponent
            key={`${cell.x},${cell.y}`}
            $cell={cell}
            $selected={selectedPoints.includes(cell)}
            $pathPart={!!algorithmResult?.path.includes(cell)}
            $additionalInfo={
              colorDistance &&
              algorithmResult?.distances != null &&
              maxDistance != null &&
              realDistance != null
                ? {
                    maxDistance,
                    realDistance,
                    distance: algorithmResult.distances.get(cell)!,
                  }
                : null
            }
            onClick={selectPoint(cell)}
            title={algorithmResult?.distances?.get(cell)?.toString() ?? ''}
          />
        ))
      )}
    </div>
  );
};
