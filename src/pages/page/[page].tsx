import { PostList } from '../../components/post-list/post-list';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPagesPaths } from '@swistak-codes/pagination';
import { Metadata } from '../../components/metadata';
import { RenderedPostMetadata } from '@swistak-codes/types';
import { getMetadataFromPostList } from '@swistak-codes/render-helpers';
import { prevNextSlugs } from '../../shared/logic/slugs';
import { pagesPosts } from '../../shared/logic/post-groups';
import { categoryNamesToPaths } from '../../shared/logic/paths';

type Props = {
  page: number;
  allPages: number;
  posts: RenderedPostMetadata[];
  categoryMap: Record<string, string>;
};

export function Page({ page, allPages, posts, categoryMap }: Props) {
  return (
    <main>
      <Metadata
        title={`świstak.codes — strona ${page} z ${allPages}`}
        abstract="O programowaniu i informatyce przystępnym językiem"
        keyword="programowanie"
        slug={'page/' + page}
        isPage
        customPrevNext={{
          next: allPages > page ? `page/${page + 1}` : undefined,
          previous: page > 2 ? `page/${page - 1}` : '',
        }}
      />
      <h1>Strona {page}</h1>
      <PostList
        posts={posts}
        currentPage={page}
        allPages={allPages}
        basePath=""
        categoryMap={categoryMap}
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getPagesPaths(pagesPosts),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const page = parseInt(params.page as string);
  const posts = getMetadataFromPostList(pagesPosts[page - 1], prevNextSlugs);

  return {
    props: {
      page,
      posts,
      allPages: pagesPosts.length,
      categoryMap: categoryNamesToPaths,
    },
  };
};

export default Page;
