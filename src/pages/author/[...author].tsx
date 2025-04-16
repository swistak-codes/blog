import { GetStaticPaths, GetStaticProps } from 'next';
import { PostList } from '../../components/post-list/post-list';
import { Metadata } from '../../components/metadata';
import { RenderedPostMetadata } from '@swistak-codes/types';
import { getMetadataFromPostList } from '@swistak-codes/render-helpers';
import { authorPosts } from '../../shared/logic/post-groups';
import { prevNextSlugs } from '../../shared/logic/slugs';
import { authorPaths, categoryNamesToPaths } from '../../shared/logic/paths';

type Props = {
  page: number;
  path: string;
  allPages: number;
  posts: RenderedPostMetadata[];
  categoryMap: Record<string, string>;
};
export function Author({ page, path, allPages, posts, categoryMap }: Props) {
  return (
    <main>
      <Metadata
        title={
          page > 1
            ? `Tomasz Świstak — strona ${page} z ${allPages}`
            : 'Tomasz Świstak'
        }
        abstract="O programowaniu i informatyce przystępnym językiem"
        keyword="Tomasz Świstak"
        slug={'author/' + path}
        isPage
        customPrevNext={{
          next:
            allPages > page
              ? `author/tomasz-swistak/page/${page + 1}`
              : undefined,
          previous:
            page > 2
              ? `author/tomasz-swistak/page/${page - 1}`
              : `author/tomasz-swistak`,
        }}
      />
      <h1>Autor: Tomasz Świstak</h1>
      <PostList
        posts={posts}
        currentPage={page}
        allPages={allPages}
        basePath="/author/tomasz-swistak"
        categoryMap={categoryMap}
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: authorPaths,
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const [, , pageStr] = params.author;

  const page = pageStr != null ? parseInt(pageStr) : 1;
  const path = (params.author as string[]).join('/');
  const posts = getMetadataFromPostList(authorPosts[page - 1], prevNextSlugs);

  return {
    props: {
      page,
      path,
      posts,
      allPages: authorPosts.length,
      categoryMap: categoryNamesToPaths,
    },
  };
};

export default Author;
