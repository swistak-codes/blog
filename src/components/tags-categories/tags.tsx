import React from 'react';
import Link from 'next/link';
import styles from './tags-categories.module.scss';
import clsx from 'clsx';

type Props = {
  tags: string[];
  nameToSlugsMap: Record<string, string>;
};

export const Tags = ({ tags, nameToSlugsMap }: Props) => (
  <div className={styles.tagCategoryContainer}>
    {tags
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .map((tag) => (
        <div className={clsx(styles.badge, styles.tagBadge)} key={tag}>
          <i className="ph ph-hash" />
          <Link href={`/tag/${nameToSlugsMap[tag]}`} prefetch={false} scroll>
            {tag}
          </Link>
        </div>
      ))}
  </div>
);
