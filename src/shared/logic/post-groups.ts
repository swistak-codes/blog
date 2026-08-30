import {
  groupByCategories,
  groupByMonth,
  groupByTags,
  splitToPages,
} from '@swistak-codes/pagination';
import * as posts from '../../_posts/content/all-posts';

const allPosts = Object.values(posts);

export const pagesPosts = splitToPages(allPosts);
export const archivePosts = groupByMonth(allPosts);
export const authorPosts = pagesPosts;
export const tagPosts = groupByTags(allPosts);
export const categoryPosts = groupByCategories(allPosts);
