import Link from 'next/link';
import { Props } from './types';
import clsx from 'clsx';
import commonPaginationStyles from './common-pagination.module.scss';
import React from 'react';

export const NextPage = ({ currentPage, allPages, basePath }: Props) => {
  const isHidden = currentPage >= allPages;

  const VisibleLink = ({ children }: React.PropsWithChildren) => (
    <Link href={`${basePath}/page/${currentPage + 1}`} scroll prefetch={false}>
      {children}
    </Link>
  );

  const InvisibleLink = ({ children }: React.PropsWithChildren) => (
    <span aria-hidden="true">{children}</span>
  );

  const LinkComponent = isHidden ? InvisibleLink : VisibleLink;

  return (
    <div
      className={clsx({
        [commonPaginationStyles.hidablePagination]: isHidden,
      })}
    >
      <LinkComponent>Następna</LinkComponent>
    </div>
  );
};
