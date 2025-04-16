import {
  getArchivePaths,
  getAuthorPaths,
  getCategoriesNamesToPaths,
  getCategoriesPaths,
  getPostsPaths,
  getTagsPaths,
} from '@swistak-codes/pagination';
import * as posts from '../../_posts/content/all-posts';
import {
  archivePosts,
  authorPosts,
  categoryPosts,
  tagPosts,
} from './post-groups';
import { categoryNamesToSlugs, tagNamesToSlugs } from './slugs';

const allPosts = Object.values(posts);

export const postPaths = getPostsPaths(allPosts);
export const tagPaths = getTagsPaths(tagPosts, tagNamesToSlugs);
export const categoryPaths = getCategoriesPaths(
  categoryPosts,
  categoryNamesToSlugs
);
export const authorPaths = getAuthorPaths('tomasz-swistak', authorPosts);
export const archivePaths = getArchivePaths(archivePosts);
export const categoryNamesToPaths = getCategoriesNamesToPaths(
  categoryPosts,
  categoryNamesToSlugs
);
