import { Post } from '@swistak-codes/types';

export const getTagPostCount = (allPosts: Post[]) => {
  const result: Record<string, number> = {};

  for (const post of allPosts) {
    for (const tag of post.meta.tags) {
      if (result[tag] != null) {
        result[tag] = result[tag] + 1;
      } else {
        result[tag] = 1;
      }
    }
  }

  return result;
};
