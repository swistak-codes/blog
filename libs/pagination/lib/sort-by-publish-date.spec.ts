import { sortByPublishDate } from './sort-by-publish-date';
import { posts } from './test-harness';

describe('sort-by-publish-date', () => {
  it('should sort descending by publish date', () => {
    const result = sortByPublishDate(posts);
    expect(result[0].meta.publishTime).toBe('2022-03-20T15:00:00.000Z');
    expect(result[4].meta.publishTime).toBe('2020-03-10T15:00:00.000Z');
  });
});
