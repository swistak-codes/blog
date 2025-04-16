import styles from './post-date.module.scss';
import { HTMLProps } from 'react';

export const PostDate = (props: HTMLProps<HTMLDivElement>) => (
  <div className={styles.postDate} {...props} data-testid="post-date" />
);
