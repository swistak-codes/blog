import { Categories } from '../../tags-categories/categories';
import { Tags } from '../../tags-categories/tags';
import React from 'react';
import styles from './tags-categories.module.scss';

type Props = {
  categories: string[];
  nameToPathsMap: Record<string, string>;
  nameToSlugsMap: Record<string, string>;
  tags: string[];
};

export const TagsCategories = ({
  categories,
  nameToPathsMap,
  nameToSlugsMap,
  tags,
}: Props) => (
  <nav className={styles.moreContainer}>
    <div className={styles.similarWrapper}>
      Interesują Cię podobne treści? Jeśli tak, to sprawdź:
    </div>
    <Categories categories={categories} nameToPathsMap={nameToPathsMap} />
    <Tags nameToSlugsMap={nameToSlugsMap} tags={tags} />
  </nav>
);
