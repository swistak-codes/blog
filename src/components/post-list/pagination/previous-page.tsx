import Link from 'next/link';
import { PrevPageProps } from './types';
import clsx from 'clsx';
import commonPaginationStyles from './common-pagination.module.scss';
import React from 'react';

export const PreviousPage = ({ currentPage, basePath }: PrevPageProps) => {
  const isHidden = currentPage <= 1;

  const VisibleLink = ({ children }: React.PropsWithChildren) => (
    <Link
      href={
        currentPage > 2 ? `${basePath}/page/${currentPage - 1}` : basePath + '/'
      }
      scroll
      prefetch={false}
    >
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
      <LinkComponent>Poprzednia</LinkComponent>
    </div>
  );
};
