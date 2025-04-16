import { MazeCellProps } from '../types';
import { calculateHighlightValue } from '../../helpers/calculate-highlight-value';
import { highlightColor } from '../../helpers/theme';
import clsx from 'clsx';
import styles from '../../styles.module.scss';

export const MazeCell = ({
  $cell,
  $selected,
  $pathPart,
  $additionalInfo,
  ...rest
}: MazeCellProps) => {
  const style = $additionalInfo
    ? {
        background: highlightColor(calculateHighlightValue($additionalInfo)),
      }
    : {};

  return (
    <div
      className={clsx({
        [styles.mazeCell]: true,
        [styles.mazeTop]: $cell.top,
        [styles.mazeRight]: $cell.right,
        [styles.mazeLeft]: $cell.left,
        [styles.mazeBottom]: $cell.bottom,
        [styles.mazePathPart]: $pathPart,
        [styles.mazeSelected]: $selected,
      })}
      style={style}
      {...rest}
    />
  );
};
