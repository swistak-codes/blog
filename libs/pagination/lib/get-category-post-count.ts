import { categoryParentRelations, Post } from '@swistak-codes/types';

export const getCategoryPostCount = (allPosts: Post[]) => {
  const result: Record<string, number> = {};

  for (const post of allPosts) {
    for (const category of post.meta.categories) {
      if (result[category] != null) {
        result[category] = result[category] + 1;
      } else {
        result[category] = 1;
      }

      if (categoryParentRelations.has(category)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const parent = categoryParentRelations.get(category)!;
        if (result[parent] != null) {
          result[parent] = result[parent] + 1;
        } else {
          result[parent] = 1;
        }
      }
    }
  }

  return result;
};
