import { RenderedPostMetadata } from '@swistak-codes/types';
import { Pagination } from './pagination/pagination';
import { List } from './list/list';

type Props = {
  posts: RenderedPostMetadata[];
  currentPage: number;
  allPages: number;
  basePath: string;
  categoryMap?: Record<string, string>;
  isOfftopic?: boolean;
};

export const PostList = ({
  posts,
  currentPage,
  allPages,
  basePath,
  categoryMap,
  isOfftopic,
}: Props) => {
  return (
    <>
      <List posts={posts} categoryMap={categoryMap} isOfftopic={isOfftopic} />
      <Pagination
        currentPage={currentPage}
        allPages={allPages}
        basePath={basePath}
      />
    </>
  );
};
