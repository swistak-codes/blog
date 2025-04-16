import { groupByTags } from './group-by-tags';
import { posts } from './test-harness';

jest.mock('./consts', () => ({
  __esModule: true,
  PAGE_SIZE: 2,
}));

describe('group-by-tags', () => {
  it('should create object with tag keys', () => {
    const result = groupByTags(posts);
    expect(result).toMatchObject({
      first: expect.any(Array),
      second: expect.any(Array),
      third: expect.any(Array),
    });
  });

  it('should split to pages', () => {
    const result = groupByTags(posts);
    expect(result.first).toHaveLength(2);
    expect(result.second).toHaveLength(2);
    expect(result.third).toHaveLength(1);
  });
});
