import styles from './grid.module.scss';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  minWidth: number;
}>;

export const Grid = ({ minWidth, children }: Props) => (
  <div
    style={{
      gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr)`,
    }}
    className={styles.grid}
  >
    {children}
  </div>
);
