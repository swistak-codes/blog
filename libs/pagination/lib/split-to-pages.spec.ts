import { splitToPages } from './split-to-pages';
import { posts } from './test-harness';
import { compareDesc } from 'date-fns';

jest.mock('./consts', () => ({
  __esModule: true,
  PAGE_SIZE: 2,
}));

describe('split-to-pages', () => {
  it('should split into pages by given length', () => {
    const result = splitToPages(posts);
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveLength(2);
    expect(result[1]).toHaveLength(2);
    expect(result[2]).toHaveLength(1);
  });

  it('posts on each page should be sorted', () => {
    const result = splitToPages(posts);
    for (const [first, second] of result) {
      if (second) {
        const compared = compareDesc(
          new Date(first.meta.publishTime),
          new Date(second.meta.publishTime)
        );
        expect(compared).toBeLessThanOrEqual(0);
      }
    }
  });
});
