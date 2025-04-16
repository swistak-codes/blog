import * as _ from 'lodash/fp';

export const getTagsForMenu = (tagNamesToSlugs: Map<string, string>) =>
  _.flowRight(
    (x: [string, string][]) => x.sort((a, b) => a[0].localeCompare(b[0])),
    (x: Map<string, string>) => [...x.entries()]
  )(tagNamesToSlugs);
