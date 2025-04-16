import { HTMLProps } from 'react';
import styles from './center.module.scss';

export const Center = (props: HTMLProps<HTMLParagraphElement>) => (
  <p className={styles.center} {...props} />
);
