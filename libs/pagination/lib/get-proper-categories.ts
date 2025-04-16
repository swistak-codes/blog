import * as _ from 'lodash/fp';
import { categoryParentRelations } from '@swistak-codes/types';

export const getProperCategories = (categories: string[]) =>
  // TODO temporary uniq until fix the bug with empty parent category
  _.flowRight(
    _.uniq,
    _.flatMap<string, string>((x) =>
      categoryParentRelations.has(x)
        ? [categoryParentRelations.get(x) as string, x]
        : x
    )
  )(categories);
