import * as _ from 'lodash/fp';
import { GroupByTagsResult } from './group-by-tags';

type TagParams = {
  params: { tag: string[] };
};

export const getTagsPaths = (
  tags: GroupByTagsResult,
  tagToSlugMap: Map<string, string>
) => {
  const result: TagParams[] = [];

  for (const [tag, posts] of Object.entries(tags)) {
    const slug = tagToSlugMap.get(tag) as string;
    result.push({ params: { tag: [slug] } });

    if (posts.length > 1) {
      result.push(
        ..._.flowRight(
          _.drop(1),
          _.times((x) => ({
            params: { tag: [slug, 'page', `${x + 1}`] },
          })),
          _.size
        )(posts)
      );
    }
  }
  return result;
};
