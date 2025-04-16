import React from 'react';
import Link from 'next/link';
import styles from './socials-advert.module.scss';
import commonPostFooterStyles from './common-post-footer.module.scss';
import commonStyles from '../../common.module.scss';

export const SocialsAdvert = () => (
  <div className={styles.socialsContainer}>
    <strong className={commonPostFooterStyles.strongText}>
      Chcesz wiedzieć o nowych treściach?
    </strong>
    <p>
      Koniecznie polub{' '}
      <a href="https://www.facebook.com/swistak.codes">
        <b>świstak.codes na Facebooku</b>
      </a>
      , obserwuj{' '}
      <a href="https://www.instagram.com/swistak.codes/">
        <b>na Instagramie</b>,
      </a>{' '}
      <a href="https://www.linkedin.com/in/tomasz-swistak/">
        <b>LinkedIn</b>,
      </a>{' '}
      <a href="https://bsky.app/profile/swistak.codes">
        <b>Bluesky</b>
      </a>{' '}
      lub zasubskrybuj mój{' '}
      <Link href="/rss" prefetch={false} scroll passHref legacyBehavior>
        <a>
          <b>kanał RSS</b>
        </a>
      </Link>
      !
    </p>
    <p>Możesz też wesprzeć moją działalność klikając link poniżej:</p>
    <p>
      {/*<a*/}
      {/*  href="https://buycoffee.to/swistak"*/}
      {/*  target="_blank"*/}
      {/*  rel="noreferrer"*/}
      {/*  className={commonStyles.pureLink}*/}
      {/*>*/}
      {/*  /!* eslint-disable-next-line @next/next/no-img-element *!/*/}
      {/*  <img*/}
      {/*    src="/buycoffeeto-btn-primary.png"*/}
      {/*    className={styles.coffee}*/}
      {/*    alt="Postaw mi kawę na buycoffee.to"*/}
      {/*  />*/}
      {/*</a>*/}
      <a
        href="https://suppi.pl/tswistak"
        target="_blank"
        rel="noreferrer"
        className={commonStyles.pureLink}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width="165"
          src="/suppi.svg"
          alt="Wesprzyj mnie na suppi.pl"
          className={styles.coffee}
        />
      </a>
    </p>
  </div>
);
