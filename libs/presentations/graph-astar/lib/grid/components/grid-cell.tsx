import { GridCellProps } from '../types';
import { calculateHighlightValue } from '../../helpers/calculate-highlight-value';
import { highlightColor } from '../../helpers/theme';
import clsx from 'clsx';
import styles from '../../styles.module.scss';

export const GridCell = ({
  $cell,
  $pathPart,
  $additionalInfo,
  $selected,
  ...rest
}: GridCellProps) => {
  const style = $additionalInfo
    ? {
        background: highlightColor(calculateHighlightValue($additionalInfo)),
      }
    : {};

  return (
    <div
      className={clsx({
        [styles.gridCell]: true,
        [styles.gridIsBlocked]: $cell.isBlocked,
        [styles.gridPathPart]: $pathPart,
        [styles.gridSelected]: $selected,
      })}
      style={style}
      {...rest}
    />
  );
};
