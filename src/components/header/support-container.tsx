import clsx from 'clsx';
import styles from './support-container.module.scss';
import commonHeaderStyles from './common-header.module.scss';
import commonStyles from '../common.module.scss';

export const SupportContainer = () => (
  <nav
    className={clsx(
      commonHeaderStyles.menuContainer,
      commonHeaderStyles.menuContainerMargin,
      styles.container
    )}
  >
    {/*<a*/}
    {/*  href="https://buycoffee.to/swistak"*/}
    {/*  target="_blank"*/}
    {/*  rel="noreferrer"*/}
    {/*  className={commonStyles.pureLink}*/}
    {/*>*/}
    {/*  <img*/}
    {/*    src="/buycoffeeto-btn-primary.png"*/}
    {/*    alt="Postaw mi kawę na buycoffee.to"*/}
    {/*    width="125"*/}
    {/*    height="31"*/}
    {/*    className={styles.buyCoffee}*/}
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
        className={styles.buyCoffee}
      />
    </a>
  </nav>
);
