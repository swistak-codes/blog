import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';
import { useRouter } from 'next/router';
import styles from './header-link.module.scss';
import clsx from 'clsx';
import commonHeaderStyles from './common-header.module.scss';

type Props = {
  href: string;
  children: ReactNode;
  icon?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export const HeaderLink = ({ href, children, icon, onClick }: Props) => {
  const router = useRouter();
  const isActive =
    href === '/'
      ? router.asPath === '/' || router.asPath.startsWith('/page')
      : router.asPath.includes(href);

  return (
    <div>
      <Link href={href} prefetch={false} scroll passHref legacyBehavior>
        <a
          className={clsx({
            [styles.headerLink]: true,
            [styles.active]: isActive,
          })}
          onClick={onClick}
        >
          {icon && (
            <>
              <i className={clsx('ph', icon)}></i>
              <span className={commonHeaderStyles.longNbsp}>&nbsp;</span>
            </>
          )}
          {children}
        </a>
      </Link>
    </div>
  );
};
