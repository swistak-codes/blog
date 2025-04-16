import { groupByCategories } from './group-by-categories';
import { posts } from './test-harness';

jest.mock('./consts', () => ({
  __esModule: true,
  PAGE_SIZE: 1,
}));

describe('group-by-categories', () => {
  it('should create object with category keys', () => {
    const result = groupByCategories(posts);
    expect(result).toMatchObject({
      'first-category': expect.any(Array),
      'second-category': expect.any(Array),
      'third-category': expect.any(Array),
    });
  });

  it('should split to pages', () => {
    const result = groupByCategories(posts);
    expect(result['first-category']).toHaveLength(2);
    expect(result['second-category']).toHaveLength(3);
    expect(result['third-category']).toHaveLength(1);
  });
});
