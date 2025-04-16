export type BaseCell = {
  x: number;
  y: number;
};

export type CellProps<TCellInfo extends BaseCell> = {
  $cell: TCellInfo;
  $selected: boolean;
  $pathPart: boolean;
  $additionalInfo: {
    distance: number;
    maxDistance: number;
    realDistance: number;
  } | null;
  onClick: () => void;
  title?: string;
};
