import { Metadata } from '../../components/metadata';
import React from 'react';
import { GetStaticProps } from 'next';
import { sortedTagsWithSlugs, tagPostCount } from '../../shared/logic/slugs';
import { TagExplorer } from '../../components/tag-explorer/tag-explorer';
import styles from '../../components/common.module.scss';

type Props = {
  tagsToSlugs: [string, string][];
  tagCount: Record<string, number>;
};

export function Tag({ tagsToSlugs, tagCount }: Props) {
  return (
    <main>
      <Metadata
        title="Indeks zagadnień"
        abstract="O programowaniu i informatyce przystępnym językiem"
        keyword=""
        slug="tag"
        isPage
      />
      <h1>
        <i className="ph ph-hash"></i> Indeks zagadnień (tagi)
      </h1>
      <article className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <TagExplorer tagsToSlugs={tagsToSlugs} tagCount={tagCount} />
        </div>
      </article>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      tagsToSlugs: sortedTagsWithSlugs,
      tagCount: tagPostCount,
    },
  };
};

export default Tag;
