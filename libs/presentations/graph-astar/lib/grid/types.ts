import { CellProps } from '../helpers/types';

export type GridCellInfo = {
  x: number;
  y: number;
  isBlocked: boolean;
};

export type GridCellProps = CellProps<GridCellInfo>;
