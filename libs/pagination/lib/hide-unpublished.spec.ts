import { getPostWithFutureDate, posts } from './test-harness';
import { hideUnpublished } from './hide-unpublished';

describe('hide-unpublished', () => {
  const originalEnv = process.env;

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should not filter unpublished if process.env['HIDE_UNPUBLISHED'] = false", () => {
    process.env.HIDE_UNPUBLISHED = 'false';
    const futurePost = getPostWithFutureDate();
    const result = hideUnpublished([...posts, futurePost]);

    expect(result).toContainEqual(futurePost);
  });

  // TODO uncomment after fix
  // it("should filter unpublished if process.env['HIDE_UNPUBLISHED'] = true", () => {
  //   process.env.HIDE_UNPUBLISHED = 'true';
  //   const futurePost = getPostWithFutureDate();
  //   const result = hideUnpublished([...posts, futurePost]);
  //
  //   expect(result).not.toContainEqual(futurePost);
  // });
});
