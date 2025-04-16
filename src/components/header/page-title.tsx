import NextImage from 'next/legacy/image';
import logo from '../../assets/logo-bg.png';
import Link from 'next/link';
import styles from './page-title.module.scss';
import commonStyles from '../common.module.scss';
import clsx from 'clsx';

export const PageTitle = () => {
  return (
    <Link href="/" passHref scroll legacyBehavior>
      <a className={clsx(commonStyles.pureLink, styles.linkWrapper)}>
        <div className={styles.logo}>
          <div className={styles.logoWrapper}>
            <NextImage
              src={logo}
              alt=""
              placeholder="blur"
              layout="intrinsic"
            />
          </div>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>świstak.codes</div>
            <div className={styles.subtitle}>
              O programowaniu, informatyce i matematyce przystępnym językiem
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
