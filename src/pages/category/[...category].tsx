import { PostList } from '../../components/post-list/post-list';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Metadata } from '../../components/metadata';
import { RenderedPostMetadata } from '@swistak-codes/types';
import { getMetadataFromPostList } from '@swistak-codes/render-helpers';
import { categorySlugsToNames, prevNextSlugs } from '../../shared/logic/slugs';
import { categoryNamesToPaths, categoryPaths } from '../../shared/logic/paths';
import { categoryPosts } from '../../shared/logic/post-groups';
import React from 'react';

type Props = {
  page: number;
  category: string;
  basePath: string;
  path: string;
  allPages: number;
  posts: RenderedPostMetadata[];
  categoryMap: Record<string, string>;
};
export function Category({
  page,
  category,
  basePath,
  path,
  allPages,
  posts,
  categoryMap,
}: Props) {
  return (
    <main>
      <Metadata
        title={
          page > 1 ? `${category} — strona ${page} z ${allPages}` : category
        }
        abstract="O programowaniu i informatyce przystępnym językiem"
        keyword={category}
        slug={'category/' + path}
        isPage
        customPrevNext={{
          next:
            allPages > page
              ? `category/${basePath}/page/${page + 1}`
              : undefined,
          previous:
            page > 2
              ? `category/${basePath}/page/${page - 1}`
              : `category/${basePath}`,
        }}
      />
      <h1>
        <i className="ph ph-tag" /> {category}
      </h1>
      <PostList
        posts={posts}
        currentPage={page}
        allPages={allPages}
        basePath={'/category/' + basePath}
        categoryMap={categoryMap}
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: categoryPaths,
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const [slug1, slug2, ...rest] = params.category;
  const slug = slug2 != null && slug2 !== 'page' ? slug2 : slug1;
  const page =
    rest.length > 1
      ? parseInt(rest[1])
      : slug2 === 'page' && rest.length > 0
      ? parseInt(rest[0])
      : 1;
  const category = categorySlugsToNames.get(slug);
  const basePath = slug2 === slug ? `${slug1}/${slug2}` : slug;
  const path = (params.category as string[]).join('/');
  const allPosts = categoryPosts[category];
  const posts = getMetadataFromPostList(allPosts[page - 1], prevNextSlugs);

  return {
    props: {
      page,
      category,
      basePath,
      path,
      posts,
      allPages: allPosts.length,
      categoryMap: categoryNamesToPaths,
    },
  };
};

export default Category;
