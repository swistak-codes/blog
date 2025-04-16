import Link from 'next/link';
import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <p>
        <a href="https://swistak.codes/" className={styles.link}>
          świstak.codes
        </a>{' '}
        — &copy; 2020-
        {new Date().getFullYear()} Tomasz Świstak
      </p>
      <p>
        <Link
          href="/spis-artykulow"
          scroll
          prefetch={false}
          passHref
          legacyBehavior
        >
          <a className={styles.link}>Spis artykułów</a>
        </Link>
        <Link href="/category" scroll prefetch={false} passHref legacyBehavior>
          <a className={styles.link}>Kategorie</a>
        </Link>
        <Link href="/archive" scroll prefetch={false} passHref legacyBehavior>
          <a className={styles.link}>Archiwum</a>
        </Link>
        <Link href="/tag" scroll prefetch={false} passHref legacyBehavior>
          <a className={styles.link}>Indeks zagadnień</a>
        </Link>
        <Link
          href="/privacy-policy"
          scroll
          prefetch={false}
          passHref
          legacyBehavior
        >
          <a className={styles.link}>Polityka prywatności</a>
        </Link>
        <Link href="/licencje" scroll prefetch={false} passHref legacyBehavior>
          <a className={styles.link}>Licencje</a>
        </Link>
        <a href="mailto:tomasz@swistak.codes" className={styles.link}>
          Kontakt
        </a>
      </p>
    </footer>
  );
};
