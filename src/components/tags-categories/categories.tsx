import React from 'react';
import Link from 'next/link';
import { getProperCategories } from '@swistak-codes/pagination';
import styles from './tags-categories.module.scss';
import clsx from 'clsx';

type Props = {
  categories: string[];
  nameToPathsMap: Record<string, string>;
};

export const Categories = ({ categories, nameToPathsMap }: Props) => (
  <div className={styles.tagCategoryContainer}>
    {getProperCategories(categories).map((category) => (
      <div className={clsx(styles.badge, styles.categoryBadge)} key={category}>
        <i className="ph ph-tag" />
        <Link href={nameToPathsMap[category]} prefetch={false} scroll>
          {category}
        </Link>
      </div>
    ))}
  </div>
);
