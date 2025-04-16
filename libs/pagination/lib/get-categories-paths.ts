import * as _ from 'lodash/fp';
import { GroupByCategoriesResult } from './group-by-categories';
import { categoryParentRelations } from '@swistak-codes/types';

type CategoryParams = {
  params: { category: string[] };
};

export const getCategoriesPaths = (
  categories: GroupByCategoriesResult,
  categoryToSlugMap: Map<string, string>
) => {
  const result: CategoryParams[] = [];

  for (const [category, posts] of Object.entries(categories)) {
    const slug = categoryToSlugMap.get(category) as string;
    const parent = categoryParentRelations.get(category);
    let baseAddress = [slug];

    if (parent != null) {
      const parentSlug = categoryToSlugMap.get(parent) as string;
      baseAddress = [parentSlug, slug];
    }

    result.push({ params: { category: [...baseAddress] } });

    if (posts.length > 1) {
      result.push(
        ..._.flowRight(
          _.drop(1),
          _.times((x) => ({
            params: { category: [...baseAddress, 'page', `${x + 1}`] },
          })),
          _.size
        )(posts)
      );
    }
  }
  return result;
};
