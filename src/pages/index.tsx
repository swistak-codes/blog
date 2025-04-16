import { PostList } from '../components/post-list/post-list';
import { Metadata } from '../components/metadata';
import { GetStaticProps } from 'next';
import { RenderedPostMetadata } from '@swistak-codes/types';
import { getMetadataFromPostList } from '@swistak-codes/render-helpers';
import { prevNextSlugs } from '../shared/logic/slugs';
import { pagesOfftops, pagesPosts } from '../shared/logic/post-groups';
import { categoryNamesToPaths } from '../shared/logic/paths';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { LatestOfftopic } from '../components/latest-offtopic';

type Props = {
  posts: RenderedPostMetadata[];
  allPages: number;
  categoryMap: Record<string, string>;
  latestOfftopic: {
    name: string;
    url: string;
    date: string;
  };
};

export function Index({ posts, allPages, categoryMap, latestOfftopic }: Props) {
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
      <LatestOfftopic {...latestOfftopic} />
      <PostList
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
  const latestOfftopic = pagesOfftops[0][0];

  return {
    props: {
      posts,
      allPages: pagesPosts.length,
      categoryMap: categoryNamesToPaths,
      latestOfftopic: {
        name: latestOfftopic.meta.title,
        url: `/offtopic/${latestOfftopic.meta.slug}`,
        date: format(new Date(latestOfftopic.meta.publishTime), 'PPP', {
          locale: pl,
        }),
      },
    },
  };
};

export default Index;
