import { groupByMonth } from './group-by-month';
import { posts } from './test-harness';

jest.mock('./consts', () => ({
  __esModule: true,
  PAGE_SIZE: 1,
}));

describe('group-by-month', () => {
  it('should create object with year-month keys', () => {
    const result = groupByMonth(posts);
    expect(result).toMatchObject({
      '2022-03': expect.any(Array),
      '2021-03': expect.any(Array),
      '2020-03': expect.any(Array),
    });
  });

  it('should split to pages', () => {
    const result = groupByMonth(posts);
    expect(result['2022-03']).toHaveLength(2);
    expect(result['2021-03']).toHaveLength(1);
    expect(result['2020-03']).toHaveLength(2);
  });
});
