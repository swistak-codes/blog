import { LinkToPageProps, Props } from './types';
import { getPageNumbersToDisplay } from '@swistak-codes/pagination';
import NextLink from 'next/link';
import clsx from 'clsx';
import commonPaginationStyles from './common-pagination.module.scss';
import styles from './page-links.module.scss';

const LinkToPage = ({ page, basePath }: LinkToPageProps) => {
  const link = page === 1 ? basePath + '/' : `${basePath}/page/${page}`;

  return (
    <NextLink href={link} scroll prefetch={false}>
      {'' + page}
    </NextLink>
  );
};

export const PageLinks = ({ currentPage, allPages, basePath }: Props) => {
  const pages = getPageNumbersToDisplay(currentPage, allPages);
  return (
    <div
      className={clsx({
        [commonPaginationStyles.hidablePagination]: pages.length <= 0,
      })}
    >
      {pages.map((page, i) =>
        page == null ? (
          <span className={styles.page} key={i}>
            …
          </span>
        ) : page === currentPage ? (
          <span className={styles.page} key={i}>
            {page}
          </span>
        ) : (
          <span className={styles.page} key={i}>
            <LinkToPage basePath={basePath} page={page} />
          </span>
        ),
      )}
    </div>
  );
};
