import styles from './polka.module.scss';

export const Polka = () => {
  return (
    <div className={styles.container} aria-hidden="true">
      <div className={styles.polka1}></div>
      <div className={styles.polka2}></div>
      <div className={styles.triangle}>▲</div>
    </div>
  );
};
