import { SearchablePostList } from '../components/searchable-post-list';
import { Metadata } from '../components/metadata';
import { GetStaticProps } from 'next';
import { RenderedPostMetadata } from '@swistak-codes/types';
import { getMetadataFromPostList } from '@swistak-codes/render-helpers';
import { prevNextSlugs } from '../shared/logic/slugs';
import { pagesPosts } from '../shared/logic/post-groups';
import { categoryNamesToPaths } from '../shared/logic/paths';

type Props = {
  posts: RenderedPostMetadata[];
  allPages: number;
  categoryMap: Record<string, string>;
};

export function Index({ posts, allPages, categoryMap }: Props) {
  return (
    <main>
      <Metadata
        abstract="O programowaniu i informatyce przystępnym językiem"
        keyword="programowanie"
        isPage
        customPrevNext={{
          next: 'page/2',
        }}
      />
      <SearchablePostList
        posts={posts}
        currentPage={1}
        allPages={allPages}
        basePath=""
        categoryMap={categoryMap}
      />
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getMetadataFromPostList(pagesPosts[0], prevNextSlugs);

  return {
    props: {
      posts,
      allPages: pagesPosts.length,
      categoryMap: categoryNamesToPaths,
    },
  };
};

export default Index;
