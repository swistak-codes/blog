import * as _ from 'lodash/fp';
import { Post, PrevNext } from '@swistak-codes/types';
import { sortByPublishDate } from './sort-by-publish-date';

export const getPrevNextPostsMap = (posts: Post[]): Map<string, PrevNext> => {
  const sortedPosts = sortByPublishDate(posts);

  return _.flowRight(
    (entries) => new Map<string, PrevNext>(entries),
    _.map<[string, Post], [string, PrevNext]>(([index, post]) => {
      const i = parseInt(index);
      return [
        post.meta.slug,
        {
          next: sortedPosts[i - 1]?.meta.slug || null,
          nextName: sortedPosts[i - 1]?.meta.title || null,
          previous: sortedPosts[i + 1]?.meta.slug || null,
          previousName: sortedPosts[i + 1]?.meta.title || null,
        },
      ];
    }),
    _.entries
  )(sortedPosts);
};
