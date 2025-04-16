import { GetStaticPaths, GetStaticProps } from 'next';
import { PostList } from '../../components/post-list/post-list';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Metadata } from '../../components/metadata';
import { RenderedPostMetadata } from '@swistak-codes/types';
import { getMetadataFromPostList } from '@swistak-codes/render-helpers';
import { archivePosts } from '../../shared/logic/post-groups';
import { prevNextSlugs } from '../../shared/logic/slugs';
import { archivePaths, categoryNamesToPaths } from '../../shared/logic/paths';

type Props = {
  parsedDate: string;
  page: number;
  basePath: string;
  path: string;
  allPages: number;
  posts: RenderedPostMetadata[];
  categoryMap: Record<string, string>;
};

export function Archive({
  parsedDate,
  page,
  basePath,
  path,
  posts,
  allPages,
  categoryMap,
}: Props) {
  return (
    <main>
      <Metadata
        title={
          page > 1 ? `${parsedDate} — strona ${page} z ${allPages}` : parsedDate
        }
        abstract="O programowaniu i informatyce przystępnym językiem"
        keyword="programowanie"
        slug={'archive/' + path}
        isPage
        customPrevNext={{
          next:
            allPages > page
              ? `archive/${basePath}/page/${page + 1}`
              : undefined,
          previous:
            page > 2
              ? `archive/${basePath}/page/${page - 1}`
              : `archive/${basePath}`,
        }}
      />
      <h1>
        <i className="ph ph-calendar-blank"></i> {parsedDate}
      </h1>
      <PostList
        posts={posts}
        currentPage={page}
        allPages={allPages}
        basePath={'/archive/' + basePath}
        categoryMap={categoryMap}
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: archivePaths,
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const [year, month, ...rest] = params.archive;
  const date = `${year}-${month}`;
  const basePath = `${year}/${month}`;
  const parsedDate = format(
    new Date(parseInt(year), parseInt(month) - 1, 1),
    'LLLL yyyy',
    {
      locale: pl,
    }
  );
  const page = rest.length > 1 ? parseInt(rest[1]) : 1;
  const path = (params.archive as string[]).join('/');
  const allPosts = archivePosts[date];
  const posts = getMetadataFromPostList(allPosts[page - 1], prevNextSlugs);

  return {
    props: {
      parsedDate,
      page,
      basePath,
      path,
      allPages: allPosts.length,
      posts,
      categoryMap: categoryNamesToPaths,
    },
  };
};

export default Archive;
