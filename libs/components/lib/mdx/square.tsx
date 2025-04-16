import styles from './square.module.scss';

type Props = { color: string };

export const Square = ({ color }: Props) => (
  <span className={styles.square} style={{ backgroundColor: color }} />
);
