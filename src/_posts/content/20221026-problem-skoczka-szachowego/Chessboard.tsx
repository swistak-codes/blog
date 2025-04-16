import { HTMLProps } from 'react';
import styles from '../../posts.module.scss';

export const Chessboard = (props: HTMLProps<HTMLDivElement>) => (
  <div {...props} className={styles.chessboard} />
);
