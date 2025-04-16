import * as _ from 'lodash/fp';
import { categoryChildrenRelations, Post } from '@swistak-codes/types';
import { splitToPages } from './split-to-pages';

export type GroupByCategoriesResult = Record<string, Post[][]>;

export const groupByCategories = (posts: Post[]): GroupByCategoriesResult => {
  const result: GroupByCategoriesResult = {};
  const allCategories = _.flowRight(
    _.uniq,
    _.flatMap<Post, string>((x) => x.meta.categories)
  )(posts);

  for (const category of allCategories) {
    const children = categoryChildrenRelations.get(category) || [];
    // TODO temporary Set until fix the bug with empty parent category
    const possible = [...new Set([category, ...children])];
    result[category] = _.flowRight(
      splitToPages,
      _.filter<Post>(
        (x) => _.intersection(possible)(x.meta.categories).length > 0
      )
    )(posts);
  }
  return result;
};
