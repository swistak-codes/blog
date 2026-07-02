import styles from './search.module.scss';

export const EmptyResults = () => (
  <div className={styles.emptyResults}>
    <p className={styles.emptyResultsTitle}>Nic nie znaleziono... 😿</p>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      className={styles.emptyResultsImage}
      src="https://anesthetize.swistak.codes/gifs/no-results.webp"
      alt=""
    />
  </div>
);
