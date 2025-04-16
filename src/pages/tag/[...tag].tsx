import { GetStaticPaths, GetStaticProps } from 'next';
import { PostList } from '../../components/post-list/post-list';
import { Metadata } from '../../components/metadata';
import { RenderedPostMetadata } from '@swistak-codes/types';
import { getMetadataFromPostList } from '@swistak-codes/render-helpers';
import { prevNextSlugs, tagSlugsToNames } from '../../shared/logic/slugs';
import { categoryNamesToPaths, tagPaths } from '../../shared/logic/paths';
import { tagPosts } from '../../shared/logic/post-groups';
import React from 'react';

type Props = {
  page: number;
  tag: string;
  slug: string;
  path: string;
  allPages: number;
  posts: RenderedPostMetadata[];
  categoryMap: Record<string, string>;
};
export function Tag({
  tag,
  page,
  slug,
  path,
  allPages,
  posts,
  categoryMap,
}: Props) {
  return (
    <main>
      <Metadata
        title={page > 1 ? `${tag} — strona ${page} z ${allPages}` : tag}
        abstract="O programowaniu i informatyce przystępnym językiem"
        keyword={tag}
        slug={'tag/' + path}
        isPage
        customPrevNext={{
          next: allPages > page ? `tag/${slug}/page/${page + 1}` : undefined,
          previous: page > 2 ? `tag/${slug}/page/${page - 1}` : `tag/${slug}`,
        }}
      />
      <h1>
        <i className="ph ph-hash" /> {tag}
      </h1>
      <PostList
        posts={posts}
        currentPage={page}
        allPages={allPages}
        basePath={'/tag/' + slug}
        categoryMap={categoryMap}
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: tagPaths,
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const [slug, ...rest] = params.tag;
  const page = rest.length > 1 ? parseInt(rest[1]) : 1;
  const tag = tagSlugsToNames.get(slug);
  const path = (params.tag as string[]).join('/');
  const allPosts = tagPosts[tag];
  const posts = getMetadataFromPostList(allPosts[page - 1], prevNextSlugs);

  return {
    props: {
      page,
      tag,
      slug,
      path,
      posts,
      allPages: allPosts.length,
      categoryMap: categoryNamesToPaths,
    },
  };
};

export default Tag;
