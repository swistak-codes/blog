import { LinkTree } from '@swistak-codes/types';
import { GetStaticProps } from 'next';
import {
  archiveToLinkTree,
  getArchiveForMenu,
} from '@swistak-codes/pagination';
import { archivePosts } from '../../shared/logic/post-groups';
import { Tree } from '../../components/tree/tree';
import { Metadata } from '../../components/metadata';
import React from 'react';
import styles from '../../components/common.module.scss';

type Props = {
  archives: LinkTree[];
};

export function Archive({ archives }: Props) {
  return (
    <main>
      <Metadata
        title="Archiwum"
        abstract="O programowaniu i informatyce przystępnym językiem"
        keyword=""
        slug="archive"
        isPage
      />
      <h1>
        <i className="ph ph-calendar"></i> Archiwum
      </h1>
      <article className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <Tree tree={archives} />
        </div>
      </article>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      archives: archiveToLinkTree(getArchiveForMenu(archivePosts)),
    },
  };
};

export default Archive;
