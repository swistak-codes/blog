import * as _ from 'lodash/fp';
import * as posts from '../_posts/content/all-posts';
import { Post, categories, tags } from '@swistak-codes/types';

const allPosts = Object.values(posts);

describe('posts', () => {
  it.each(
    _.flowRight(
      _.entries,
      _.mapValues((x) => x.length),
      _.groupBy<Post>((x) => x.meta.slug)
    )(allPosts)
  )("slug '%s' is only once", (_, length) => {
    expect(length).toBe(1);
  });

  it.each([
    'o-mnie',
    'privacy-policy',
    'publikacje',
    'index',
    'feed',
    'archive',
    'author',
    'category',
    'page',
    'tag',
    'robots.txt',
    'iframe-content',
    'sitemap.xml',
    'videos',
  ])("there is no post with '%s' slug", (slug) => {
    for (const post of allPosts) {
      expect(post.meta.slug).not.toEqual(slug);
    }
  });

  it('there is no post with 4 digits in a slug', () => {
    for (const post of allPosts) {
      expect(post.meta.slug).not.toMatch(/^\d{4}$/);
    }
  });

  it.each(
    _.map<Post, { abstract: string; slug: string }>((x) => ({
      abstract: x.meta.abstract,
      slug: x.meta.slug,
    }))(allPosts)
  )('abstracts have max 158 chars ($slug)', ({ abstract }) => {
    expect(abstract.length).toBeLessThanOrEqual(158);
  });

  it.each(_.map<Post, string>((x) => x.meta.slug)(allPosts))(
    'slug $slug should have max 200 chars',
    (slug) => {
      expect(slug.length).toBeLessThanOrEqual(200);
    }
  );

  it.each(
    _.map<Post, { postCategories: string[]; slug: string }>((x) => ({
      postCategories: x.meta.categories,
      slug: x.meta.slug,
    }))(allPosts)
  )('$slug contains only known categories', ({ postCategories }) => {
    for (const category of postCategories) {
      expect(categories).toContain(category);
    }
  });

  it.each(
    _.flowRight(
      _.entries,
      _.mapValues((x) => x.length),
      _.groupBy<Post>((x) => x.meta.title)
    )(allPosts)
  )('title "%s" is only once', (_, length) => {
    expect(length).toBe(1);
  });

  it.each(
    _.flowRight(
      _.entries,
      _.mapValues((x) => x.length),
      _.groupBy<Post>((x) => x.meta.publishTime)
    )(allPosts)
  )('publish time "%s" is only once', (_, length) => {
    expect(length).toBe(1);
  });

  it.each(
    _.flowRight(
      _.entries,
      _.mapValues((x) => x.length),
      _.groupBy<Post>((x) => x.meta.abstract)
    )(allPosts)
  )('abstract is only once "%s"', (_, length) => {
    expect(length).toBe(1);
  });

  it.each(_.map<Post, string>((x) => x.meta.slug)(allPosts))(
    'slug "%s" contains only lowercase letters, numbers and hyphens',
    (slug) => {
      expect(slug).toMatch(/^[a-z0-9-]*$/);
    }
  );
});
