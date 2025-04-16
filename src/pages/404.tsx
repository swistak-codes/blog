import styles from '../components/common.module.scss';

export default function Custom404() {
  return (
    <div className={styles.centered}>
      <h2>404: Strony nie znaleziono!</h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://anesthetize.swistak.codes/gifs/404.webp" alt="" />
    </div>
  );
}
