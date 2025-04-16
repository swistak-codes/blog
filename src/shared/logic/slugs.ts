import {
  getCategoryNameToCategorySlugMapping,
  getCategoryPostCount,
  getPrevNextPostsMap,
  getTagNameToTagSlugMapping,
  getTagPostCount,
  getTagsForMenu,
  reverseMapping,
} from '@swistak-codes/pagination';
import { categoryPosts, tagPosts } from './post-groups';
import * as posts from '../../_posts/content/all-posts';
import * as offtops from '../../_offtopic/all-offtopics';

const allPosts = Object.values(posts);
const allOfftops = Object.values(offtops);

export const tagNamesToSlugs = getTagNameToTagSlugMapping(
  Object.keys(tagPosts)
);
export const tagSlugsToNames = reverseMapping(tagNamesToSlugs);
export const categoryNamesToSlugs = getCategoryNameToCategorySlugMapping(
  Object.keys(categoryPosts)
);
export const categorySlugsToNames = reverseMapping(categoryNamesToSlugs);
export const categoryPostCount = getCategoryPostCount(allPosts);

export const prevNextSlugs = getPrevNextPostsMap(allPosts);
export const prevNextOfftopSlugs = getPrevNextPostsMap(allOfftops);

export const sortedTagsWithSlugs = getTagsForMenu(tagNamesToSlugs);
export const tagPostCount = getTagPostCount(allPosts);
