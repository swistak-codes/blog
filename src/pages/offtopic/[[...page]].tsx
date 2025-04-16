import { prevNextOfftopSlugs } from '../../shared/logic/slugs';
import { Metadata } from '../../components/metadata';
import { pagesOfftops } from '../../shared/logic/post-groups';
import { RenderedPostMetadata } from '@swistak-codes/types';
import { PostList } from '../../components/post-list/post-list';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getMetadataFromPostList } from '@swistak-codes/render-helpers';
import { getOfftopPagesPaths } from '@swistak-codes/pagination';

type Props = {
  posts: RenderedPostMetadata[];
  allPages: number;
  page: number;
};

export function Index({ posts, allPages, page }: Props) {
  return (
    <main>
      <Metadata
        title={`świstak.codes — offtopic${
          page > 1 ? ` — strona ${page} z ${allPages}` : ''
        }`}
        abstract="O programowaniu i informatyce przystępnym językiem"
        keyword="programowanie"
        isPage
        customPrevNext={{
          next: allPages > page ? `offtopic/page/${page + 1}` : undefined,
          previous: page > 2 ? `offtopic/page/${page - 1}` : 'offtopic',
        }}
        slug={page > 1 ? `offtopic/page/${page}` : 'offtopic'}
      />
      <PostList
        posts={posts}
        currentPage={page}
        allPages={allPages}
        basePath="offtopic"
        isOfftopic
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getOfftopPagesPaths(pagesOfftops),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const page = params.page?.length ? parseInt(params.page[1]) : 1;
  const posts = getMetadataFromPostList(
    pagesOfftops[page - 1],
    prevNextOfftopSlugs
  );

  return {
    props: {
      posts,
      allPages: pagesOfftops.length,
      page,
    },
  };
};

export default Index;
