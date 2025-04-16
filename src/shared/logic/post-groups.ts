import {
  groupByCategories,
  groupByMonth,
  groupByTags,
  splitToPages,
} from '@swistak-codes/pagination';
import * as posts from '../../_posts/content/all-posts';
import * as offtops from '../../_offtopic/all-offtopics';

const allPosts = Object.values(posts);
const allOfftops = Object.values(offtops);

export const pagesPosts = splitToPages(allPosts);
export const archivePosts = groupByMonth(allPosts);
export const authorPosts = pagesPosts;
export const tagPosts = groupByTags(allPosts);
export const categoryPosts = groupByCategories(allPosts);

export const pagesOfftops = splitToPages(allOfftops);
