import * as _ from 'lodash/fp';

export const getPageNumbersToDisplay = (
  currentPage: number,
  allPages: number
): (number | null)[] => {
  if (allPages === 1) {
    return [];
  }
  const pages = _.flowRight(
    _.sortedUniq,
    _.sortBy(_.identity),
    _.filter<number>((x) => x > 0 && x <= allPages)
  )([1, currentPage - 1, currentPage, currentPage + 1, allPages]);

  const result = [];

  for (let i = 0; i < pages.length; i++) {
    const current = pages[i];
    const previous = pages[i - 1];

    if (previous != null && current - previous > 1) {
      result.push(null, current);
    } else {
      result.push(current);
    }
  }

  return result;
};
