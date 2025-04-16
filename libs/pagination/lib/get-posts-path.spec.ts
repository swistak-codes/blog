import { getPostsPaths } from './get-posts-paths';
import { posts } from './test-harness';

describe('get-posts-path', () => {
  it('should take all slugs and create paths array out of them', () => {
    const result = getPostsPaths(posts);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ params: { entry: 'first-post' } }),
        expect.objectContaining({ params: { entry: 'second-post' } }),
        expect.objectContaining({ params: { entry: 'third-post' } }),
        expect.objectContaining({ params: { entry: 'fourth-post' } }),
        expect.objectContaining({ params: { entry: 'fifth-post' } }),
      ])
    );
  });
});
