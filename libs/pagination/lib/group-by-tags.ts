import * as _ from 'lodash/fp';
import { Post } from '@swistak-codes/types';
import { splitToPages } from './split-to-pages';

export type GroupByTagsResult = Record<string, Post[][]>;

export const groupByTags = (posts: Post[]): GroupByTagsResult => {
  const result: GroupByTagsResult = {};
  const allTags = _.flowRight(
    _.uniq,
    _.flatMap<Post, string>((x) => x.meta.tags)
  )(posts);

  for (const tag of allTags) {
    result[tag] = _.flowRight(
      splitToPages,
      _.filter<Post>((x) => x.meta.tags.includes(tag))
    )(posts);
  }

  return result;
};
