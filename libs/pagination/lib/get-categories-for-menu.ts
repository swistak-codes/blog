import {
  categories,
  LinkTree,
  categoryChildrenRelations,
  categoryParentRelations,
} from '@swistak-codes/types';
import * as _ from 'lodash/fp';

export const getCategoriesForMenu = (
  categoryToSlugMap: Record<string, string>
) => {
  const mapCategory = (category: string) => ({
    name: category,
    slug: categoryToSlugMap[category] || '',
    children: _.flowRight(
      _.map<string, LinkTree>(mapCategory),
      _.defaultTo<string[]>([])
    )(categoryChildrenRelations.get(category)),
  });

  return _.flowRight(
    _.map<string, LinkTree>(mapCategory),
    _.filter<string>((x) => !categoryParentRelations.has(x)),
    (x: Set<string>) => [...x]
  )(categories);
};
