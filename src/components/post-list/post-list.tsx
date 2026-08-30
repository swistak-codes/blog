import { RenderedPostMetadata } from '@swistak-codes/types';
import { Pagination } from './pagination/pagination';
import { List } from './list/list';

type Props = {
  posts: RenderedPostMetadata[];
  currentPage: number;
  allPages: number;
  basePath: string;
  categoryMap?: Record<string, string>;
};

export const PostList = ({
  posts,
  currentPage,
  allPages,
  basePath,
  categoryMap,
}: Props) => {
  return (
    <>
      <List posts={posts} categoryMap={categoryMap} />
      <Pagination
        currentPage={currentPage}
        allPages={allPages}
        basePath={basePath}
      />
    </>
  );
};
