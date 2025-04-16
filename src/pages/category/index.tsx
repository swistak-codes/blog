import { LinkTree } from '@swistak-codes/types';
import { GetStaticProps } from 'next';
import { getCategoriesForMenu } from '@swistak-codes/pagination';
import { categoryNamesToPaths } from '../../shared/logic/paths';
import { Tree } from '../../components/tree/tree';
import { Metadata } from '../../components/metadata';
import React from 'react';
import { categoryPostCount } from '../../shared/logic/slugs';
import styles from '../../components/common.module.scss';

type Props = {
  categories: LinkTree[];
  categoryCount: Record<string, number>;
};

export function CategoryIndex({ categories, categoryCount }: Props) {
  return (
    <main>
      <Metadata
        title="Spis kategorii"
        abstract="O programowaniu i informatyce przystępnym językiem"
        keyword=""
        slug="category"
        isPage
      />
      <h1>
        <i className="ph ph-tag"></i> Spis kategorii
      </h1>
      <article className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <Tree tree={categories} nameToCount={categoryCount} />
        </div>
      </article>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      categories: getCategoriesForMenu(categoryNamesToPaths),
      categoryCount: categoryPostCount,
    },
  };
};

export default CategoryIndex;
