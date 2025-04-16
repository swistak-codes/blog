import { GroupByCategoriesResult } from './group-by-categories';
import { categoryParentRelations } from '@swistak-codes/types';

export const getCategoriesNamesToPaths = (
  categories: GroupByCategoriesResult,
  categoryToSlugMap: Map<string, string>
) => {
  const result: Record<string, string> = {};

  for (const [category] of Object.entries(categories)) {
    const slug = categoryToSlugMap.get(category) as string;
    const parent = categoryParentRelations.get(category);
    let baseAddress = [slug];

    if (parent != null) {
      const parentSlug = categoryToSlugMap.get(parent) as string;
      baseAddress = [parentSlug, slug];
    }

    result[category] = `/category/${baseAddress.join('/')}`;
  }
  return result;
};
