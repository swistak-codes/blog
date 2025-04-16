import Link from 'next/link';
import commonHeaderStyles from './common-header.module.scss';
import styles from './socials.module.scss';

export const Socials = () => {
  return (
    <nav className={commonHeaderStyles.menuContainer}>
      <div>
        <a
          href="https://www.facebook.com/swistak.codes/"
          target="_blank"
          title="Facebook"
          className={styles.socialLink}
          rel="noreferrer"
        >
          <i className="ph ph-facebook-logo"></i>
        </a>
      </div>
      <div>
        <a
          href="https://www.instagram.com/swistak.codes/"
          target="_blank"
          title="Instagram"
          className={styles.socialLink}
          rel="noreferrer"
        >
          <i className="ph ph-instagram-logo"></i>
        </a>
      </div>
      <div>
        <a
          href="https://www.linkedin.com/in/tomasz-swistak/"
          target="_blank"
          title="LinkedIn"
          className={styles.socialLink}
          rel="noreferrer"
        >
          <i className="ph ph-linkedin-logo"></i>
        </a>
      </div>
      <div>
        <a
          href="https://bsky.app/profile/swistak.codes"
          target="_blank"
          title="Bluesky"
          className={styles.socialLink}
          rel="noreferrer"
        >
          <i className="ph ph-butterfly"></i>
        </a>
      </div>
      <div>
        <a
          href="https://github.com/swistak-codes"
          target="_blank"
          title="GitHub"
          className={styles.socialLink}
          rel="noreferrer"
        >
          <i className="ph ph-github-logo"></i>
        </a>
      </div>
      <div>
        <Link href="/rss" passHref prefetch={false} scroll legacyBehavior>
          <a title="RSS" className={styles.socialLink}>
            <i className="ph ph-rss"></i>
          </a>
        </Link>
      </div>
    </nav>
  );
};
