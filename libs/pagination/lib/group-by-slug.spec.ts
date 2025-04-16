import { groupBySlug } from './group-by-slug';
import { posts } from './test-harness';

describe('group-by-slug', () => {
  it('should do map slug->post', () => {
    const result = groupBySlug(posts);

    expect(result).toMatchObject({
      'first-post': expect.anything(),
      'second-post': expect.anything(),
      'third-post': expect.anything(),
      'fourth-post': expect.anything(),
      'fifth-post': expect.anything(),
    });

    for (const [slug, post] of Object.entries(result)) {
      expect(post.meta.slug).toBe(slug);
    }
  });
});
