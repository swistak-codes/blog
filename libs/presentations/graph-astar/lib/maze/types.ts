import { CellProps } from '../helpers/types';

export type MazeCellInfo = {
  x: number;
  y: number;
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
};

export type MazeCellProps = CellProps<MazeCellInfo>;
