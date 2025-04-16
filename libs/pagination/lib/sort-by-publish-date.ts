import { compareDesc } from 'date-fns';
import { Post } from '@swistak-codes/types';

export const sortByPublishDate = (posts: Post[]) =>
  posts.sort((a, b) =>
    compareDesc(new Date(a.meta.publishTime), new Date(b.meta.publishTime))
  );
