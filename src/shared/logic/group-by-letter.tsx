import { groupBy } from 'lodash';

export const groupByLetter = (tags: [string, string][]) =>
  Object.entries(
    groupBy(tags, (tag) => {
      const first = tag[0][0];

      if (first.match(/[a-zA-Z]/)) {
        return first.toUpperCase();
      } else {
        return '#';
      }
    })
  );
